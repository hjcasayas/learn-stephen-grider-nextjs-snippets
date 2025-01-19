'use client';

import { startTransition, useActionState } from 'react';
import { createSnippet } from "@/actions";

function SnippetsCreatePage() {
    const [formState, action] = useActionState(createSnippet, { message: '' });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            action(formData);
        });
    }


    return (<form onSubmit={handleSubmit}>
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
            {
                formState.message != null && formState.message != '' ?
                    <div className='my-2 p-2 bg-red-200 border rounded border-red-400'>{formState.message}</div>
                    : null
            }
            <button type="submit" className=" rounded p-2 bg-blue-200">Create</button>
        </div>
    </form>);
}

export default SnippetsCreatePage;