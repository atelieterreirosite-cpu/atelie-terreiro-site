/**
 * Verificação determinística da regra de status de eventos.
 * Executar: npx --yes tsx scripts/verify-event-status.ts
 *
 * Sem framework de testes no projeto — script alternativo leve.
 */

import { resolveEventStatus } from "../src/lib/adapters/event";
import type { EventContent } from "../src/lib/cms/models";

type Case = {
  name: string;
  today: string;
  startDate: string | null;
  endDate: string | null;
  postDate?: string | null;
  expected: "futuro" | "em-andamento" | "encerrado";
};

function stub(startDate: string | null, endDate: string | null, postDate?: string | null): Pick<EventContent, "date" | "details"> {
  return {
    date: postDate ?? "",
    details: {
      startDate,
      endDate,
      schedule: null,
      location: null,
      city: null,
      online: false,
      eventLink: null,
      relatedProjectId: null,
      participants: null,
      registrationOpen: false,
      registrationLink: null,
      gallery: [],
    },
  };
}

const cases: Case[] = [
  {
    name: "início futuro sem data final → futuro",
    today: "2026-04-01",
    startDate: "10/04/2026",
    endDate: null,
    expected: "futuro",
  },
  {
    name: "começa hoje sem data final → em-andamento",
    today: "2026-04-10",
    startDate: "10/04/2026",
    endDate: null,
    expected: "em-andamento",
  },
  {
    name: "início passado sem data final → encerrado",
    today: "2026-04-11",
    startDate: "10/04/2026",
    endDate: null,
    expected: "encerrado",
  },
  {
    name: "início passado e fim futuro → em-andamento",
    today: "2026-04-15",
    startDate: "10/04/2026",
    endDate: "20/04/2026",
    expected: "em-andamento",
  },
  {
    name: "data final igual a hoje → em-andamento",
    today: "2026-04-20",
    startDate: "10/04/2026",
    endDate: "20/04/2026",
    expected: "em-andamento",
  },
  {
    name: "data final passada → encerrado",
    today: "2026-04-21",
    startDate: "10/04/2026",
    endDate: "20/04/2026",
    expected: "encerrado",
  },
  {
    name: "início e fim iguais — no dia → em-andamento",
    today: "2026-04-10",
    startDate: "10/04/2026",
    endDate: "10/04/2026",
    expected: "em-andamento",
  },
  {
    name: "início e fim iguais — dia seguinte → encerrado",
    today: "2026-04-11",
    startDate: "10/04/2026",
    endDate: "10/04/2026",
    expected: "encerrado",
  },
  {
    name: "sem início válido (nem post.date) → encerrado",
    today: "2026-04-01",
    startDate: null,
    endDate: null,
    postDate: null,
    expected: "encerrado",
  },
  {
    name: "sem início ACF, fallback post.date futuro → futuro",
    today: "2026-04-01",
    startDate: null,
    endDate: null,
    postDate: "2026-04-10T12:00:00",
    expected: "futuro",
  },
  {
    name: "sem início ACF, fallback post.date passado (um dia) → encerrado",
    today: "2026-04-11",
    startDate: null,
    endDate: null,
    postDate: "2026-04-10T12:00:00",
    expected: "encerrado",
  },
  {
    name: "sem início ACF, fallback post.date hoje → em-andamento",
    today: "2026-04-10",
    startDate: null,
    endDate: null,
    postDate: "2026-04-10T12:00:00",
    expected: "em-andamento",
  },
];

let failed = 0;

for (const testCase of cases) {
  const actual = resolveEventStatus(
    stub(testCase.startDate, testCase.endDate, testCase.postDate),
    testCase.today,
  );

  if (actual !== testCase.expected) {
    failed += 1;
    console.error(`FAIL: ${testCase.name}`);
    console.error(`  expected=${testCase.expected} actual=${actual}`);
  } else {
    console.log(`PASS: ${testCase.name}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} caso(s) falharam.`);
  process.exit(1);
}

console.log(`\nTodos os ${cases.length} casos passaram.`);
