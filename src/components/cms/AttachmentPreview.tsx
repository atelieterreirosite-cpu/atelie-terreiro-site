import type { ACFFile } from "@/lib/cms/models";

interface AttachmentPreviewProps {
  attachment: ACFFile | null;
}

function humanFileSize(bytes?: number): string | null {
  if (bytes === undefined || !Number.isFinite(bytes) || bytes < 0) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

function fileLabel(file: ACFFile): string {
  if (file.mime_type === "application/pdf") return "PDF";
  if (file.mime_type?.startsWith("video/")) return "Vídeo";
  return file.mime_type || "Arquivo";
}

export function AttachmentPreview({ attachment }: AttachmentPreviewProps) {
  if (!attachment?.url) return null;

  const size = humanFileSize(attachment.filesize);

  return (
    <div className="attachment-preview">
      <div className="attachment-icon" aria-hidden="true">
        ↓
      </div>
      <div className="attachment-copy">
        <strong>{attachment.filename || attachment.title || "Anexo"}</strong>
        <span>
          {fileLabel(attachment)}
          {size ? ` · ${size}` : ""}
        </span>
      </div>
      <a href={attachment.url} target="_blank" rel="noreferrer" className="button button-small">
        Abrir anexo
      </a>
    </div>
  );
}
