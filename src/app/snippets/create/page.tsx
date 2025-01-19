import { prismaDb } from "@/db/prisma";
import { redirect } from "next/navigation";

async function SnippetsCreatePage() {
    async function createSnippet(formData: FormData) {
        // 1. Server action
        'use server';

        // 2. validation
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;
        console.log({ title, code });

        // 3. create snippet
        const snippet = await prismaDb.snippet.create({ data: { title, code } });
        console.log({ snippet });

        // 4. redirect to home page
        redirect('/');
    }

    return (<form action={createSnippet}>
        <h3 className="font-bold m-3">Create a Snippet</h3>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <label className="w-12 self-center" htmlFor="title">Title</label>
                <input className="border rounded p-2 w-full" name="title" id="title" />
            </div>
            <div className="flex gap-4">
                <label className="w-12 self-center" htmlFor="code">Code</label>
                <textarea className="border rounded p-2 w-full" name="code" id="code" />
            </div>
            <button type="submit" className=" rounded p-2 bg-blue-200">Create</button>
        </div>
    </form>);
}

export default SnippetsCreatePage;