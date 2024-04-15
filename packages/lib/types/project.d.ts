import type { Group, Project, Task } from "@workspace/db/client";

export type ProjectWithGroups = Project & { groups: Group[] };
export type GroupWithTasks = Group & { tasks: Task[] };
