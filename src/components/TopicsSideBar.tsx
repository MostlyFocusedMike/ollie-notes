import Link from "next/link";

export default function TopicsSidebar({ topics }: { topics: TopicType[] }) {
  // https://rocketvalidator.com/accessibility-validation/axe/4.8/landmark-complementary-is-top-level
  // This is why this is a pure nav, and not an aside.
  return (
    <div>
      <nav aria-label="Topics">
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
      <form>
        {/* TODO: This will pop open a modal later */}
        <button className="text-white bg-green-700 hover:bg-blue-700 font-medium rounded-lg text-sm px-2 py-2" aria-label="Create New Topic" title="Create New Topic" type="submit">+</button>
      </form>
    </div>
  );
}