import type { MetaFunction } from "@remix-run/node";
import { readDoodle } from "~/utils/doodle.service";

export async function loader() {
  return { doodle: await readDoodle("mekyu.txt") };
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="relative w-full h-screen overflow-hidden">Hello World</div>
  );
}
