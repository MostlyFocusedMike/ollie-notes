import Users from "@/components/Users";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Ollie Notes Home Page</h1>
      <Users />
    </main>
  );
}
