'use client';

import type { Snippet } from "@prisma/client";
import Editor from '@monaco-editor/react';
import { useState } from "react";
import { editSnippet } from "@/actions";

export interface SnippetEditFormProps {
    snippet: Snippet;
}

export function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [code, setCode] = useState<string>(snippet.code);

    function handleEditorChange(value: string | undefined, _ev: unknown) {
        setCode(value ?? '');
    }

    const editSnippetAction = editSnippet.bind(null, snippet.id, code);

    return (<div>
        <Editor
            defaultLanguage="javascript"
            defaultValue={snippet.code}
            theme="vs-dark"
            height='40vh'
            onChange={handleEditorChange}
            options={{ minimap: { enabled: false } }}
        />
        <form action={editSnippetAction}>
            <button className="p-2 border rounded" type="submit">Save</button>
        </form>
    </div>);
}