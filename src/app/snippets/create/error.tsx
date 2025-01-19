'use client';

interface NewErrorPageProps {
    error: Error;
    reset: () => void;
}

function NewErrorPage({ error }: NewErrorPageProps) {
    return <div>{error.message}</div>
}

export default NewErrorPage;