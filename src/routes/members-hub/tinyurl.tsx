import { useParams, useNavigate } from "@solidjs/router";
import { onMount, createSignal, lazy } from "solid-js";

import styles from '../Home.module.css';

const NotFound = lazy(() => import('../404'));

export default function TinyURL() {
  const params = useParams();
  const [notFound, setNotFound] = createSignal(false);

  // If accessed as /link/:path, redirect to the real URL or show 404
  onMount(() => {
    if (params.path) {
      const found = shortenedUrls.find((s) => s.path === params.path);
      if (found) {
        window.location.replace(found.url);
      } else {
        setNotFound(true);
      }
    }
  });

  if (params.path) {
    return (<>{notFound() ? <NotFound/> : (
      <div class={`${styles.intro} ${styles.showFooter} pb-20 flex items-center`}>
        <h1 class="text-5xl font-bold">Redirecting...</h1>
      </div>
    )}</>);
  }

  return (
    <div class={`${styles.intro} ${styles.showFooter}`}>
      <h3 class="text-2xl font-bold">Shortened URLs</h3>
      <ul class="block list-disc">
        {shortenedUrls.map((s) => (
          <li><a href={"/link/" + s.path}>{s.path}</a> &rarr; {s.url}</li>
        ))}
      </ul>
    </div>
  );
}

// Sample data for shortened URLs
export const shortenedUrls = [
  { path: "REVIEWERS-HUB", url: "https://reviewers-hub.onrender.com/" },
  { path: "CONSTI", url: "https://access-consti.pages.dev/" },
  { path: "DP-BLAST", url: "https://meltartica.github.io/dp-blast" },
  //{ path: "LEAP2025-FINDER", url: "https://leap-go-burrr.pages.dev/" },
  { path: "test", url: "https://example.com/" },
];