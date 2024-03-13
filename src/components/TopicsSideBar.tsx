import Link from "next/link";

export default function TopicsSidebar({ topics }: { topics: TopicType[] }) {
  return (
    <aside>
      <nav aria-label="Topics">
        <h2>Topics</h2>
        <ul>
          {
            topics.map((topic) => (
              <li key={topic.id}>
                <Link href={`/notes/${topic.id}`} className="text-blue-600 hover:underline underline">
                  {topic.title}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </aside>
  );
}