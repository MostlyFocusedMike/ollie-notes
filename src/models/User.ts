import { prisma } from "@/db";
import { handleErrors } from "./utils";

type NewUserType = {
  email: string;
  name: string;
  profilePic: string;
  bio: string;
  provider: string;
};

// extend NewUserType to include id
type NewDBUserType = {
  id: number;
  email: string;
  name: string;
  bio: string;
  profilePic: string;
  provider: string;
};

class User {
  id: number;
  email: string;
  name: string;
  profilePic: string;
  bio: string;
  provider: string;

  constructor({ id, email, name, profilePic, bio, provider }: NewDBUserType) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.profilePic = profilePic;
    this.bio = bio;
    this.provider = provider;
  }

  static async findMany(): Promise<User[]> {
    const users = await prisma.user.findMany().catch(handleErrors);
    return (users || []).map((user) => new User(user));
  }

  static async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user
      .findUnique({ where: { email } })
      .catch(handleErrors);

    return user ? new User(user) : null;
  }

  static async find(id: number): Promise<User | null> {
    const user = await prisma.user
      .findUnique({ where: { id } })
      .catch(handleErrors);

    return user ? new User(user) : null;
  }

  static async create(newUser: NewUserType): Promise<User | null> {
    const user: NewDBUserType | null = await prisma.user
      .create({ data: newUser })
      .catch(handleErrors);

    return user ? new User(user) : null;
  }

  static async createIfNotExists(newUser: NewUserType): Promise<User | null> {
    const user = await prisma.user
      .upsert({
        where: { email: newUser.email },
        update: newUser,
        create: newUser,
      })
      .catch(handleErrors);

    return user ? new User(user) : null;
  }
}

export default User;
