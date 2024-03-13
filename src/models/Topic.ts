import { prisma } from "@/db";
import { handleErrors } from "./utils";

type NewTopicType = {
  title: string;
  description: string;
  userId: number;
}

type TopicType = NewTopicType & {
  id: number;
};

class Topic {
  id: number;
  title: string;
  description: string;
  userId: number;

  constructor({ id, title, description, userId }: TopicType) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
  }

  static async create(data: NewTopicType): Promise<Topic | null> {
    const newTopic = await prisma.topic.create({ data }).catch(handleErrors);
    return newTopic ? new Topic(newTopic) : null;
  }

  static async findMany(): Promise<Topic[]> {
    const topics = await prisma.topic.findMany().catch(handleErrors);
    return (topics || []).map((topic) => new Topic(topic));
  }
}

export default Topic;
