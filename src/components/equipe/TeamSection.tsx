import type { TeamMemberMock } from "@/data/equipe";

import { TeamMember } from "./TeamMember";

interface TeamSectionProps {
  members: TeamMemberMock[];
}

export function TeamSection({ members }: TeamSectionProps) {
  if (members.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Integrantes"
      className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24 lg:py-28"
    >
      <div className="space-y-24 md:space-y-32 lg:space-y-40">
        {members.map((member, index) => (
          <TeamMember key={member.name} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}
