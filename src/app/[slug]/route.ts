import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getRedirectTarget } from "@/lib/link-shortener";

export async function GET(req: Request) {
  try {
    // Parse slug from the URL path (last segment)
    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const slug = parts[parts.length - 1];

    const { env } = await getCloudflareContext();
    const { DB } = env;

    const res = await getRedirectTarget(DB, slug);
    if (res.status === "ok") {
      return NextResponse.redirect(res.target_url);
    }
    if (res.status === "not-found") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("Redirect helper error:", res.error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  } catch (error) {
    console.error("Error redirecting slug (root):", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
