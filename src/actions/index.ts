"use server";

import { prismaDb } from "@/db/prisma";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
  await prismaDb.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });

  redirect("/");
}

export async function deleteSnippet(id: number) {
  await prismaDb.snippet.delete({
    where: {
      id,
    },
  });

  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title must be longer." };
    }

    if (typeof code !== "string" || code.length < 10) {
      return { message: "Code must be longer." };
    }

    await prismaDb.snippet.create({ data: { title, code } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: "Something went wrong." };
  }
  redirect("/");
}
