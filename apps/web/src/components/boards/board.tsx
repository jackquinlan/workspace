"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

import { CSS } from "@dnd-kit/utilities";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    DragEndEvent,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
    DragOverEvent,
    CollisionDetection,
    pointerWithin,
    rectIntersection,
    getFirstCollision,
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

import type { Task } from "@workspace/db/client";
import type { GroupWithTasks } from "@workspace/lib/types/project";

import { GroupContainer, GroupProps } from "./group";
import { TaskCard } from "./task-card";


interface BoardViewProps {
    groups: GroupWithTasks[];
}
type TaskType = Record<string, Task[]>;

export function Board({ groups }: BoardViewProps) {
    return (
        <div></div>
    );
}