import Link from "next/link";
import TopicModalForm from "./TopicModalForm";

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
      <TopicModalForm />
    </div>
  );
}