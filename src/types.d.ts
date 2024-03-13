// type for react props with children
type PropsWithChildren = {
  children: React.ReactNode;
}

// TOPICS //////////////////////////////////////
// I know I could extend, but then I lose the properties on the VSCode peak
// I care more about that then dry types. LOOKING FOR A FIX
type RawTopicType = {
  title: string;
  description: string;
}

type NewTopicType = {
  title: string;
  description: string;
  userId: number;
}

type TopicType = {
  id: number;
  title: string;
  description: string;
  userId: number;
}