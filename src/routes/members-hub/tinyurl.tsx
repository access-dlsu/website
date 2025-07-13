import styles from '../index.module.css';
import { createAsync, query } from "@solidjs/router";
import { For } from "solid-js";

type ShortenedUrl = { path: string; url: string };

const getShortenedUrls = query(async () => {
  "use server";
  // Replace with your data fetching logic
  const { readFileSync } = await import("fs");
  const { resolve } = await import("path");
  const filePath = resolve(process.cwd(), "public/tinyurl.json");
  return JSON.parse(readFileSync(filePath, "utf-8")) as ShortenedUrl[];
}, "shortenedUrls");

export const route = {
  preload: () => getShortenedUrls(),
};

export default function TinyURL() {
  const shortenedUrls = createAsync(() => getShortenedUrls());

  return (
    <div class={`${styles.intro} ${styles.showFooter}`}>
      <h3 class="text-2xl font-bold">Shortened URLs</h3>
      <ul class="block list-disc">
        <For each={shortenedUrls()}>
          {(s) => (
            <li>
              <a href={"/" + s.path} target="_blank" rel="noopener noreferrer">{s.path}</a> &rarr; {s.url}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
