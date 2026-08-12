import type { ACFFile, ACFImage } from "@/lib/cms/models";
import { getVideoSource } from "@/lib/cms/video";

interface VideoPlayerProps {
  file: ACFFile | null;
  videoUrl: string | null;
  poster: ACFImage | null;
  title: string;
}

export function VideoPlayer({ file, videoUrl, poster, title }: VideoPlayerProps) {
  const source = getVideoSource(file, videoUrl);

  if (source.type === "file") {
    return (
      <div className="video-frame video-file">
        <video controls preload="metadata" poster={poster?.url} aria-label={title}>
          <source src={source.url} type={source.mimeType} />
          Seu navegador não suporta reprodução de vídeo HTML5.
        </video>
        <span className="media-chip">Arquivo · WordPress Media</span>
      </div>
    );
  }

  if (source.type === "youtube" || source.type === "vimeo") {
    return (
      <div className="video-frame video-embed">
        <iframe
          src={source.embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <span className="media-chip">Embed · {source.type === "youtube" ? "YouTube" : "Vimeo"}</span>
      </div>
    );
  }

  if (source.type === "external") {
    return (
      <div className="video-fallback">
        <span>Vídeo por URL externa</span>
        <a href={source.url} target="_blank" rel="noreferrer" className="button button-small">
          Abrir vídeo
        </a>
      </div>
    );
  }

  return <div className="video-fallback muted">Vídeo não informado</div>;
}
