import type { Group, Task } from "@workspace/db/client";

export type GroupWithTasks = Group & { tasks: Task[] };
