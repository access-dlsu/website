import { json } from "@solidjs/router";
import { readFileSync } from "fs";
import { resolve } from "path";

export function GET() {
  const filePath = resolve(process.cwd(), "public/tinyurl.json");
  const data = JSON.parse(readFileSync(filePath, "utf-8"));
  return json(data);
}