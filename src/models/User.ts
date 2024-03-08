import { prisma } from "@/db";

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
    const users = await prisma.user.findMany();
    return users.map((user) => new User(user));
  }

  static async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    return user ? new User(user) : null;
  }


  static async findOne(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    return user ? new User(user) : null;
  }

  static async create(newUser: NewUserType): Promise<User> {
    const user = await prisma.user.create({ data: newUser });

    return new User(user as NewDBUserType);
  }

  static async createIfNotExists(newUser: NewUserType): Promise<User | null> {
    try {
      const user = await prisma.user.upsert({
        where: { email: newUser.email },
        update: newUser,
        create: newUser,
      });

      return new User(user);
    } catch (error) {
      console.log('error:', error);
      return null
    }
  }
}

export default User;
