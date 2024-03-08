import { prisma } from "@/db";

// TODO: Move to types file once you have a solid user type
type NewDBUserType = {
  id: number;
  email: string;
  name: string;
};

class User {
  id: number;
  email: string;
  name: string;

  constructor({ id, email, name }: NewDBUserType) {
    this.id = id;
    this.email = email;
    this.name = name;
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

  static async create(newUser: { email: string; name: string }): Promise<User> {
    const user = await prisma.user.create({ data: newUser });

    return new User(user);
  }

  static async createIfNotExists(newUser: { email: string; name: string }): Promise<User | null> {
    try {
      const user = await prisma.user.upsert({
        where: { email: newUser.email },
        update: {},
        create: { name: newUser.name, email: newUser.email },
      });

      return new User(user);
    } catch (error) {
      console.log('error:', error);
      return null
    }
  }
}

export default User;
