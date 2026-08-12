import type { ACFFile } from "./models";

export type VideoSource =
  | { type: "file"; url: string; mimeType: string }
  | { type: "youtube"; embedUrl: string }
  | { type: "vimeo"; embedUrl: string }
  | { type: "external"; url: string }
  | { type: "missing" };

function safeUrl(value: string | null | undefined): URL | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

function youtubeId(url: URL): string | null {
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  let candidate: string | null = null;

  if (host === "youtu.be") {
    candidate = url.pathname.split("/").filter(Boolean)[0] ?? null;
  } else if (host === "youtube.com" || host.endsWith(".youtube.com")) {
    if (url.pathname === "/watch") candidate = url.searchParams.get("v");
    if (url.pathname.startsWith("/embed/") || url.pathname.startsWith("/shorts/")) {
      candidate = url.pathname.split("/").filter(Boolean)[1] ?? null;
    }
  }

  return candidate && /^[A-Za-z0-9_-]{6,}$/.test(candidate) ? candidate : null;
}

function vimeoId(url: URL): string | null {
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (host !== "vimeo.com" && !host.endsWith(".vimeo.com")) return null;

  return url.pathname.split("/").filter(Boolean).find((segment) => /^\d+$/.test(segment)) ?? null;
}

export function getVideoSource(
  videoFile: ACFFile | null | undefined,
  videoUrl: string | null | undefined,
): VideoSource {
  const fileUrl = safeUrl(videoFile?.url);
  if (fileUrl) {
    return {
      type: "file",
      url: fileUrl.toString(),
      mimeType: videoFile?.mime_type || "video/mp4",
    };
  }

  const externalUrl = safeUrl(videoUrl);
  if (!externalUrl) return { type: "missing" };

  const youtube = youtubeId(externalUrl);
  if (youtube) {
    return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${youtube}` };
  }

  const vimeo = vimeoId(externalUrl);
  if (vimeo) {
    return { type: "vimeo", embedUrl: `https://player.vimeo.com/video/${vimeo}` };
  }

  return { type: "external", url: externalUrl.toString() };
}
