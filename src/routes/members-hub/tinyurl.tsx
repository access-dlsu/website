import styles from '../index.module.css';
import { createAsync, query } from "@solidjs/router";
import { For } from "solid-js";

// Import the shortened URLs statically for edge compatibility
import shortenedUrlsData from "/private/tinyurl.json";

type ShortenedUrl = { path: string; url: string };

const getShortenedUrls = query(async () => {
  "use server";
  // Use statically imported data instead of readFileSync
  return shortenedUrlsData as ShortenedUrl[];
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
