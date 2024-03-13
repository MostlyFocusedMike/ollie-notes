import Topic from "@/models/Topic";

type SubPageProps = { params: { topicId: string; } };

export default async function TopicSubPage({ params: { topicId } }: SubPageProps) {
  // Coming soon, add notes and resources to this query
  const topic = await Topic.findWithNotesAndResources(Number(topicId));
  if (!topic) return <p>Topic not found</p>;

  const { title, description } = topic;

  return (
    <section aria-labelledby="topic-title">
      <h1 id="topic-title" className="text-4xl font-bold mt-8 mb-4">
        {title} Notes
      </h1>
      {!!description && <p>{description}</p>}
    </section>
  );
}