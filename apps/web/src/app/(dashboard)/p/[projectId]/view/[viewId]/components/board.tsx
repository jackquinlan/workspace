"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { CSS } from "@dnd-kit/utilities";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
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
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
} from "@dnd-kit/sortable";

import type { Task } from "@workspace/db/client";
import type { GroupWithTasks } from "@workspace/lib/types/project";

import { GroupContainer, GroupProps } from "./group";
import { TaskCard } from "./task-card";

const animateLayoutChanges: AnimateLayoutChanges = (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true });

interface BoardViewProps {
    groupsWithTasks: GroupWithTasks[];
    viewId: string;
}
type Tasks = Record<string, Task[]>;

export function Board({ groupsWithTasks, viewId }: BoardViewProps) {
    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const [groups, setGroups] = useState<GroupWithTasks[]>(groupsWithTasks);

    const [tasksByGroup, setTasksByGroup] = useState<Tasks>(() => {
        const obj: Tasks = {};
        let i = 1;
        groups.forEach((group) => {
            obj[group.id] = group.tasks;
            i++;
        });
        return obj;
    });
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
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
        setActiveId(null);
    }

    return (
        <DndContext id={viewId} sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="inline-grid grid-flow-col gap-2">
                <SortableContext items={groups} strategy={horizontalListSortingStrategy}>
                    {groups.map((group) => (
                        <DroppableGroup key={group.id} group={group}>
                            {group.tasks.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                        </DroppableGroup>
                    ))}
                </SortableContext>
            </div> 
            {mounted ? createPortal(
                <DragOverlay>
                    {activeId && (renderGroupOverlay(activeId))}
                </DragOverlay>, document.body
            ) : null}
        </DndContext>
    );

    function renderGroupOverlay(id: UniqueIdentifier) {
        const g = groupsWithTasks.find(g => g.id === id);
        return (
            <GroupContainer group={g!} style={{ backgroundColor: "#fef2f2" }}>
                {tasksByGroup[id].map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </GroupContainer>
        );
    }
}

export function DroppableGroup({ children, group }: Omit<GroupProps, "style">) {
    const { setNodeRef, listeners, transform, transition, isDragging } = useSortable({
        id: group.id,
        data: { type: "group" },
        animateLayoutChanges
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