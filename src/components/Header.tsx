import NavBar from "@/components/NavBar";
import { createClient } from "@/prismicio";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className="absolute left-0 top-0 z-10 w-full bg-transparent">
      <NavBar settings={settings} />
    </header>
  );
}
