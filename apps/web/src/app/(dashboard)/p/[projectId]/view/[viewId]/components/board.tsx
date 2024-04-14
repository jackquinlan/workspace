"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
    closestCenter,
    CollisionDetection,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    getFirstCollision,
    KeyboardSensor,
    MouseSensor,
    pointerWithin,
    rectIntersection,
    TouchSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    AnimateLayoutChanges,
    arrayMove,
    defaultAnimateLayoutChanges,
    horizontalListSortingStrategy,
    rectSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Group, Task } from "@workspace/db/client";
import type { GroupWithTasks } from "@workspace/lib/types/project";

import { GroupContainer, GroupProps } from "./group";
import { TaskCard } from "./task-card";
import { AddGroup } from "./add-group";

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

interface BoardViewProps {
    groupsWithTasks: GroupWithTasks[];
    projectId: string;
}
type Tasks = Record<string, Task[]>;

export function Board({ groupsWithTasks, projectId }: BoardViewProps) {
    console.log(groupsWithTasks);
    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const [groups, setGroups] = useState<GroupWithTasks[]>(groupsWithTasks);

    const [tasksByGroup, setTasksByGroup] = useState<Tasks>(() => {
        const obj: Tasks = {};
        groups.forEach((group) => {
            obj[group.id] = group.tasks;
        });
        return obj;
    });
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const lastOverId = useRef<UniqueIdentifier | null>(null);

    function handleAddGroup(group: Group) {
        const groupWithTasks = { ...group, tasks: [] };
        setGroups((groups) => [...groups, groupWithTasks]);
        setTasksByGroup((tasks) => ({ ...tasks, [group.id]: [] }));
    }

    function findGroup(id: UniqueIdentifier) {
        if (id in tasksByGroup) {
            return id;
        }
        return Object.keys(tasksByGroup).find((key) =>
            tasksByGroup[key].map((t) => t.id).includes(id as string),
        );
    }
    /**
     * Sensors are used to detect input methods to initiate, respond, end, or cancel different
     * drag operations.
     */
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );
    /**
     * Custom collision detection strategy optimized for multiple containers
     * @see https://codesandbox.io/p/sandbox/react-dndkit-multiple-containers-6wydy9
     */
    const collisionDetection: CollisionDetection = useCallback((args) => {
        if (activeId && activeId in tasksByGroup) {
            return closestCenter({
                ...args,
                droppableContainers: args.droppableContainers.filter(c => c.id in tasksByGroup),
            });
        }
        const pointerIntersections = pointerWithin(args);
        const intersections = pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args);
        let over = getFirstCollision(intersections, 'id');
        if (over !== null && over in tasksByGroup) {
            const groupItems = tasksByGroup[over].map(t => t.id);
            if (groupItems.length > 0) {
                over = closestCenter({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(
                        c => c.id !== over && groupItems.includes(c.id as string),
                    ),
                })[0]?.id;
            }
            lastOverId.current = over;
            return [{ id: over }];
        }
        return lastOverId.current ? [{ id: lastOverId.current }] : [];
    }, [activeId, tasksByGroup]);


    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id);
    }
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;
        if (active.id in tasksByGroup) {
            // User is actively dragging a group, swap active with over
            const a = groups.findIndex((g) => g.id === active.id);
            const o = groups.findIndex((g) => g.id === over.id);
            const n = arrayMove(groups, a, o);
            setGroups(n);
        }
        const activeGroup = findGroup(active.id);
        const overId = over?.id;
        if (!activeGroup || overId === null) {
            setActiveId(null);
            return;
        }
        const overGroup = findGroup(overId);
        if (overGroup) {
            const activeIdx = tasksByGroup[activeGroup].findIndex((t) => t.id === active.id);
            const overIdx = tasksByGroup[overGroup].findIndex((t) => t.id === overId);
            if (activeIdx !== overIdx) {
                setTasksByGroup((tasks) => ({
                    ...tasks,
                    [overGroup]: arrayMove(tasks[overGroup], activeIdx, overIdx),
                }));
            }
        }
        setActiveId(null);
    }
    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over || active.id in tasksByGroup) {
            return;
        }
        const activeGroup = findGroup(active.id);
        const overGroup = findGroup(over.id);
        if (!activeGroup || !overGroup) {
            return;
        }
        if (activeGroup !== overGroup) {
            setTasksByGroup((tasks) => {
                const activeTasks = tasks[activeGroup];
                const overTasks = tasks[overGroup];
                const activeIdx = activeTasks.findIndex((t) => t.id === active.id);
                const overIdx = overTasks.findIndex((t) => t.id === over.id);

                let i: number;
                if (over.id in tasks) {
                    i = overTasks.length + 1;
                } else {
                    const isBelowOverItem =
                        over &&
                        active.rect.current.translated &&
                        active.rect.current.translated.top > over.rect.top + over.rect.height;
                    const modifier = isBelowOverItem ? 1 : 0;
                    i = overIdx >= 0 ? overIdx + modifier : overTasks.length + 1; 
                }
                return {
                    ...tasks,
                    [activeGroup]: tasks[activeGroup].filter(
                        (task) => task.id !== active.id
                    ),
                    [overGroup]: [
                        ...tasks[overGroup].slice(0, i),
                        tasks[activeGroup][activeIdx],
                        ...tasks[overGroup].slice(i, tasks[overGroup].length),
                    ],
                };
            });
        }
    }

    return (
        <DndContext
            collisionDetection={collisionDetection}
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
        >
            <div className="inline-grid grid-flow-col gap-2">
                <SortableContext items={groups} strategy={horizontalListSortingStrategy}>
                    {groups.map((group) => (
                        <DroppableGroup key={group.id} group={group} items={tasksByGroup[group.id]}>
                            <SortableContext items={tasksByGroup[group.id]} strategy={rectSortingStrategy}>
                                {tasksByGroup[group.id].length > 0 && 
                                 tasksByGroup[group.id].map((task) => (
                                    <SortableTaskCard key={task.id} task={task} />
                                ))}
                            </SortableContext>
                        </DroppableGroup>
                    ))}
                    <AddGroup handleAddGroup={handleAddGroup} projectId={projectId} />
                </SortableContext>
            </div>
            {mounted
                ? createPortal(
                      <DragOverlay>
                          {activeId ? activeId in tasksByGroup
                              ? renderGroupOverlay(activeId)
                              : renderTaskCardOverlay(activeId)
                              : null}
                      </DragOverlay>,
                      document.body,
                  )
                : null}
        </DndContext>
    );

    function renderGroupOverlay(id: UniqueIdentifier) {
        const g = groupsWithTasks.find((g) => g.id === id);
        return (
            <GroupContainer group={g!} style={{}}>
                {tasksByGroup[id].map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </GroupContainer>
        );
    }

    function renderTaskCardOverlay(id: UniqueIdentifier) {
        const task = Object.values(tasksByGroup).flat().find(t => t.id === id)!;
        return (
            <TaskCard task={task} />
        );
    }
}

interface SortableTaskCardProps {
    task: Task;
}

export function SortableTaskCard({ task }: SortableTaskCardProps) {
    const { setNodeRef, listeners, transform, transition, isDragging } = useSortable({ 
        id: task.id,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.45 : 1,
    };

    return (
        <TaskCard ref={setNodeRef} task={task} style={style} listeners={listeners} isDragging={isDragging} />
    );
}

export function DroppableGroup({ children, group, items }: Omit<GroupProps, "style"> & { items: Task[] }) {
    const { setNodeRef, listeners, transform, transition, isDragging } = useSortable({
        id: group.id,
        data: { type: "group", children: items },
        animateLayoutChanges,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.75 : 1,
    };

    return (
        <GroupContainer ref={setNodeRef} style={style} group={group} handleProps={{ ...listeners }}>
            {children}
        </GroupContainer>
    );
}
