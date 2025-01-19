import { SnippetEditForm } from "@/components/snippet-edit-form";
import { prismaDb } from "@/db/prisma";
import { notFound } from "next/navigation";

async function SnippetsIdEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const snippet = await prismaDb.snippet.findFirst({ where: { id: parseInt(id) } });

    if (snippet == null) {
        notFound();
    }

    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h2 className="text-xl font-bold" >{snippet?.title}</h2>
            </div>
            <div>
                <SnippetEditForm snippet={snippet} />
            </div>
        </div >
    )
}

export default SnippetsIdEditPage;