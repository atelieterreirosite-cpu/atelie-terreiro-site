import type { ReactNode } from "react";

import type { CMSItem } from "@/lib/cms/models";

import { AttachmentPreview } from "./AttachmentPreview";
import { ImagePreview } from "./ImagePreview";
import { RichText } from "./RichText";

export interface ContentDetail {
  label: string;
  value: ReactNode;
}

interface ContentCardProps<TDetails extends object> {
  item: CMSItem<TDetails>;
  eyebrow: string;
  details: ContentDetail[];
  children?: ReactNode;
}

export function ContentCard<TDetails extends object>({
  item,
  eyebrow,
  details,
  children,
}: ContentCardProps<TDetails>) {
  const visibleDetails = details.filter(({ value }) => value !== null && value !== undefined && value !== "");

  return (
    <article className="content-card">
      <ImagePreview image={item.content.image} fallbackAlt={item.content.title} />

      <div className="card-body">
        <div className="card-heading">
          <span className="eyebrow">{eyebrow}</span>
          <span className="record-id">WP #{item.id}</span>
        </div>

        <h3>{item.content.title}</h3>
        {item.content.summary ? <p className="summary">{item.content.summary}</p> : null}
        <RichText html={item.content.descriptionHtml} />

        {visibleDetails.length ? (
          <dl className="content-details">
            {visibleDetails.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {children}
        <AttachmentPreview attachment={item.content.attachment} />

        <div className="card-actions">
          {item.content.externalLink ? (
            <a href={item.content.externalLink} target="_blank" rel="noreferrer">
              Link externo ↗
            </a>
          ) : null}
          <a href={item.link} target="_blank" rel="noreferrer">
            Ver registro no CMS ↗
          </a>
        </div>
      </div>
    </article>
  );
}
