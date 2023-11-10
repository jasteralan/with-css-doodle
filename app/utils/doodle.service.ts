import { promises as fs } from "fs";

export async function readDoodle(name: string) {
  return fs.readFile(`doodles/${name}`, "utf-8");
}
