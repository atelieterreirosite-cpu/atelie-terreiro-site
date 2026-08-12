import type { ReactNode } from "react";

import { ContentCard, type ContentDetail } from "@/components/cms/ContentCard";
import { SectionStatus } from "@/components/cms/SectionStatus";
import { VideoPlayer } from "@/components/cms/VideoPlayer";
import { getAllContent } from "@/lib/cms/client";
import { getPublicWordPressUrl } from "@/lib/cms/config";
import type { CMSCollection, CMSItem } from "@/lib/cms/models";

export const dynamic = "force-static";

const navigation = [
  ["projects", "Projetos"],
  ["events", "Eventos"],
  ["courses", "Cursos"],
  ["works", "Obras"],
  ["publications", "Publicações"],
  ["exhibitions", "Exposições"],
  ["videos", "Vídeos"],
] as const;

function yesNo(value: boolean): string {
  return value ? "Sim" : "Não";
}

function relation(label: string, id: number | null): ContentDetail {
  return { label, value: id ? `WordPress ID ${id}` : null };
}

function ContentSection<TDetails extends object>({
  id,
  title,
  index,
  collection,
  details,
  renderExtra,
}: {
  id: string;
  title: string;
  index: string;
  collection: CMSCollection<CMSItem<TDetails>>;
  details: (item: CMSItem<TDetails>) => ContentDetail[];
  renderExtra?: (item: CMSItem<TDetails>) => ReactNode;
}) {
  return (
    <section className="content-section" id={id}>
      <header className="section-heading">
        <div>
          <span className="section-index">{index}</span>
          <h2>{title}</h2>
        </div>
        <SectionStatus status={collection.status} count={collection.items.length} />
      </header>

      {collection.status === "error" ? (
        <div className="section-message error-message">
          <strong>Falha ao carregar {title}</strong>
          <span>O restante da demonstração continua disponível.</span>
        </div>
      ) : collection.items.length === 0 ? (
        <div className="section-message">
          <strong>Nenhum conteúdo recebido</strong>
          <span>Este endpoint respondeu corretamente, mas ainda não possui registros publicados.</span>
        </div>
      ) : (
        <div className="card-grid">
          {collection.items.map((item) => (
            <ContentCard key={item.id} item={item} eyebrow={collection.endpoint} details={details(item)}>
              {renderExtra?.(item)}
            </ContentCard>
          ))}
        </div>
      )}
    </section>
  );
}

export default async function Home() {
  const data = await getAllContent();
  const collections = Object.values(data);
  const total = collections.reduce((sum, collection) => sum + collection.items.length, 0);
  const healthy = collections.filter((collection) => collection.status === "ok").length;
  const cmsUrl = getPublicWordPressUrl();
  const buildTime = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Ateliê Terreiro, início">
          <span className="wordmark-mark">AT</span>
          <span>Ateliê Terreiro</span>
        </a>
        <span className="environment-pill">Ambiente de homologação</span>
      </header>

      <div id="top" className="hero-shell">
        <section className="hero">
          <div className="hero-copy">
            <p className="kicker"><span /> Prova técnica · Headless CMS</p>
            <h1>
              WordPress como conteúdo.
              <br />
              <em>Next.js como experiência.</em>
            </h1>
            <p className="hero-description">
              Ambiente técnico para validação da integração WordPress + ACF + Next.js.
              Esta interface é demonstrativa; a camada de dados está pronta para receber o layout definitivo.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="button">Explorar conteúdos</a>
              <span>Fonte: WordPress REST API</span>
            </div>
          </div>

          <aside className="build-panel" aria-label="Resumo técnico do build">
            <div className="panel-topline">
              <span>Snapshot do build</span>
              <span className={`health ${healthy === 7 ? "healthy" : "degraded"}`}>
                {healthy}/7 endpoints
              </span>
            </div>
            <dl>
              <div>
                <dt>CMS URL</dt>
                <dd>{cmsUrl || "Variável não configurada"}</dd>
              </div>
              <div>
                <dt>Gerado em</dt>
                <dd>{buildTime}</dd>
              </div>
              <div className="total-row">
                <dt>Conteúdos recebidos</dt>
                <dd>{String(total).padStart(2, "0")}</dd>
              </div>
            </dl>
            <div className="pipeline" aria-label="Fluxo da arquitetura">
              <span>WP</span><i>→</i><span>REST</span><i>→</i><span>Next</span><i>→</i><span>Static</span>
            </div>
          </aside>
        </section>

        <nav className="section-nav" aria-label="Categorias de conteúdo">
          {navigation.map(([id, label], index) => (
            <a href={`#${id}`} key={id}>
              <span>{String(index + 1).padStart(2, "0")}</span>{label}
            </a>
          ))}
        </nav>
      </div>

      <div className="content-shell">
        <ContentSection
          id="projects"
          title="Projetos"
          index="01"
          collection={data.projects}
          details={(item) => [
            { label: "Período", value: [item.details.startYear, item.details.endYear].filter(Boolean).join(" — ") },
            { label: "Em andamento", value: yesNo(item.details.ongoing) },
            { label: "Local", value: item.details.location },
            { label: "Participantes", value: item.details.participants },
            { label: "Curadoria / coordenação", value: item.details.curation },
          ]}
        />

        <ContentSection
          id="events"
          title="Eventos"
          index="02"
          collection={data.events}
          details={(item) => [
            { label: "Data", value: [item.details.startDate, item.details.endDate].filter(Boolean).join(" — ") },
            { label: "Horário", value: item.details.schedule },
            { label: "Local", value: [item.details.location, item.details.city].filter(Boolean).join(" · ") },
            { label: "Online", value: yesNo(item.details.online) },
            { label: "Inscrições abertas", value: yesNo(item.details.registrationOpen) },
            relation("Projeto relacionado", item.details.relatedProjectId),
          ]}
        />

        <ContentSection
          id="courses"
          title="Cursos"
          index="03"
          collection={data.courses}
          details={(item) => [
            { label: "Modalidade", value: item.details.modality },
            { label: "Carga horária", value: item.details.workload },
            { label: "Período", value: [item.details.startDate, item.details.endDate].filter(Boolean).join(" — ") },
            { label: "Horário", value: item.details.schedule },
            { label: "Ministrantes", value: item.details.instructors },
            { label: "Valor", value: item.details.price },
            { label: "Inscrições abertas", value: yesNo(item.details.registrationOpen) },
          ]}
        />

        <ContentSection
          id="works"
          title="Obras"
          index="04"
          collection={data.works}
          details={(item) => [
            { label: "Artista", value: item.details.artist },
            { label: "Ano", value: item.details.year },
            { label: "Técnica", value: item.details.technique },
            { label: "Dimensões", value: item.details.dimensions },
            relation("Projeto relacionado", item.details.relatedProjectId),
            { label: "Créditos", value: item.details.credits },
          ]}
        />

        <ContentSection
          id="publications"
          title="Publicações"
          index="05"
          collection={data.publications}
          details={(item) => [
            { label: "Tipo", value: item.details.publicationType },
            { label: "Autores", value: item.details.authors },
            { label: "Ano", value: item.details.year },
            relation("Projeto relacionado", item.details.relatedProjectId),
            { label: "Créditos", value: item.details.credits },
          ]}
        />

        <ContentSection
          id="exhibitions"
          title="Exposições"
          index="06"
          collection={data.exhibitions}
          details={(item) => [
            { label: "Período", value: [item.details.startDate, item.details.endDate].filter(Boolean).join(" — ") },
            { label: "Em cartaz", value: yesNo(item.details.onDisplay) },
            { label: "Local", value: [item.details.location, item.details.city].filter(Boolean).join(" · ") },
            { label: "Curadoria", value: item.details.curation },
            { label: "Artistas", value: item.details.artists },
            relation("Projeto relacionado", item.details.relatedProjectId),
          ]}
        />

        <ContentSection
          id="videos"
          title="Vídeos"
          index="07"
          collection={data.videos}
          details={(item) => [
            { label: "Plataforma", value: item.details.platform },
            { label: "Publicação", value: item.details.publicationDate },
            { label: "Duração", value: item.details.duration },
            { label: "Participantes", value: item.details.participants },
            relation("Projeto relacionado", item.details.relatedProjectId),
            relation("Evento relacionado", item.details.relatedEventId),
            { label: "Créditos", value: item.details.credits },
          ]}
          renderExtra={(item) => (
            <VideoPlayer
              file={item.details.videoFile}
              videoUrl={item.details.videoUrl}
              poster={item.content.image}
              title={item.content.title}
            />
          )}
        />
      </div>

      <footer className="site-footer">
        <div>
          <span className="wordmark-mark">AT</span>
          <p>Ateliê Terreiro — Headless CMS Demo</p>
        </div>
        <p>Static export · Firebase Hosting · WordPress REST API</p>
      </footer>
    </main>
  );
}
