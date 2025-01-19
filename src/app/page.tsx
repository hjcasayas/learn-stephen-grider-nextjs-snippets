import { prismaDb } from "@/db/prisma";
import Link from "next/link";

async function HomePage() {
  const snippets = await prismaDb.snippet.findMany();

  const renderSnippets = () => snippets.map(snippet => {
    return (<li key={snippet.id}>
      <Link href={`/snippets/${snippet.id}`} className="flex justify-between p-2 border rounded">
        <span className="self-center">{snippet.title}</span>
        <span className="self-center">View</span>
      </Link>
    </li>);
  });
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold self-center">Snippets</h1>
        <Link href='/snippets/create' className="border p-2 rounded self-center" >New</Link>
      </div>
      <ul className="flex flex-col gap-2">
        {renderSnippets()}
      </ul>
    </div>
  );
}

export default HomePage;
