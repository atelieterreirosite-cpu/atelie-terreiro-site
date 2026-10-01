import Image from "next/image";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { editorialFrameAlignClass } from "@/lib/media/editorialFrame";
import type { GuideView } from "@/types/views";

interface TeamNetworkProps {
  kicker: string;
  title: string;
  text: string;
  members: GuideView[];
}

function NetworkMemberRow({ member, index }: { member: GuideView; index: number }) {
  const imageOnRight = index % 2 === 1;
  const imageSrc = member.image?.src?.trim();
  const imageAlt = member.image?.alt?.trim() || member.name;
  const description = member.description?.trim();
  const imageWidth = member.image?.width && member.image.width > 0 ? member.image.width : 800;
  const imageHeight =
    member.image?.height && member.image.height > 0 ? member.image.height : 1000;
  const frameAlign = editorialFrameAlignClass(member.image?.width, member.image?.height);

  return (
    <article className="grid items-start gap-6 border-t border-border pt-12 md:gap-8 md:pt-16 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12">
      <figure
        className={`min-w-0 lg:col-span-6 ${
          imageOnRight ? "lg:col-start-7" : "lg:col-start-1"
        }`}
      >
        <div
          className={`flex h-[min(70vh,36rem)] min-h-[18rem] w-full overflow-hidden sm:min-h-[20rem] md:h-[min(75vh,40rem)] ${frameAlign}`}
        >
          {imageSrc && member.image ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          ) : (
            <MediaPlaceholder label={member.name} className="h-full min-h-full w-full" />
          )}
        </div>
      </figure>

      <div
        className={`min-w-0 space-y-4 lg:col-span-5 ${
          imageOnRight ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-8"
        } lg:pt-2 xl:pt-4`}
      >
        <h3 className="font-display text-xl leading-snug font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
          {member.name}
        </h3>
        {description ? (
          <p className="max-w-prose text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function TeamNetwork({ kicker, title, text, members }: TeamNetworkProps) {
  if (members.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="equipe-rede-title"
      className="border-t border-border pb-20 md:pb-28"
    >
      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-10 md:pt-24 lg:pt-28">
        <div className="max-w-2xl space-y-5 md:space-y-6">
          <p className="text-xs tracking-[0.15em] text-muted-light uppercase">{kicker}</p>
          <h2
            id="equipe-rede-title"
            className="font-display text-2xl leading-tight font-light tracking-wide sm:text-3xl md:text-4xl"
          >
            {title}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">{text}</p>
        </div>

        <div className="mt-14 space-y-0 md:mt-20">
          {members.map((member, index) => (
            <NetworkMemberRow
              key={member.slug || String(member.id)}
              member={member}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
