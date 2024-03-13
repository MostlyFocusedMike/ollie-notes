export default function TopicsSidebar({ topics }: { topics: TopicType[] }) {
  return (
    <aside>
      <h2>Topics</h2>
      <ul>
        {
          topics.map((topic) => (
            <li key={topic.id}>{topic.title}</li>
          ))
        }
      </ul>
    </aside>
  );
}