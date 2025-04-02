import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en"); // Default server-side redirect
}
