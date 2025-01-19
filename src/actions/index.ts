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
