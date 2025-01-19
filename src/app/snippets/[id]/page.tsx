import { deleteSnippet } from "@/actions";
import { prismaDb } from "@/db/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

async function SnippetsIdPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const snippet = await prismaDb.snippet.findFirst({ where: { id: parseInt(id) } });
    if (snippet == null) {
        notFound();
    }

    const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h2 className="text-xl font-bold" >{snippet?.title}</h2>
                <div className="flex flex-row gap-2">
                    <Link href={`/snippets/${id}/edit`} type="button" className="p-2 border rounded">Edit</Link>
                    <form action={deleteSnippetAction}>
                        <input className="hidden" readOnly id="id" name="id" defaultValue={snippet.id} />
                        <button type="submit" className="p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border rounded bg-gray-200 border-gray-200">
                <code>{snippet.code}</code>
            </pre>
        </div>
    );
}

export default SnippetsIdPage