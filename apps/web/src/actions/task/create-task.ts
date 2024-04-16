"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { db } from "@workspace/db";
import type { Task } from "@workspace/db/client";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";
import { addTaskSchema } from "@workspace/lib/validators/task";

import type { ActionState } from "@/lib/create-safe-action";
import { createSafeAction } from "@/lib/create-safe-action";

type ReturnType = ActionState<z.infer<typeof addTaskSchema>, Task>;

async function createTaskHandler(data: z.infer<typeof addTaskSchema>): Promise<ReturnType> {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const { groupId } = data;
  const groupProject = await db.group.findUnique({
    where: {
      id: groupId,
    },
    select: {
      project: true,
    },
  });
  if (!groupProject) {
    throw new Error("Group not found");
  }
  const lastItem = await db.task.findFirst({
    where: {
      groupId: groupId,
    },
    orderBy: {
      order: "desc",
    },
  });
  const task = await db.task.create({
    data: {
      ...data,
      order: lastItem ? lastItem.order + 1 : 1,
    },
  });
  revalidatePath(`/p/${groupProject.project.id}`);
  return { data: task };
}

export const createTask = createSafeAction(addTaskSchema, createTaskHandler);
