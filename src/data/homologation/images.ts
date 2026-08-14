import type { ImageAsset } from "@/types/views";

const BASE = "/images/exemplos";

/**
 * HOMOLOGATION — imagens temporárias para validação de layout.
 * Não representam documentação editorial do Ateliê Terreiro.
 */
export const homologationImages = {
  dsc1740: `${BASE}/DSC_1740.jpg`,
  dsc1706: `${BASE}/DSC_1706.jpg`,
  dsc1667: `${BASE}/DSC_1667.jpg`,
  dsc1638: `${BASE}/DSC_1638.jpg`,
  dsc1872: `${BASE}/DSC_1872.jpg`,
  dsc1831: `${BASE}/DSC_1831.jpg`,
  dsc1505: `${BASE}/DSC_1505.jpg`,
  dsc1515: `${BASE}/DSC_1515.jpg`,
  dsc1614: `${BASE}/DSC_1614.jpg`,
  dsc1581: `${BASE}/DSC_1581.jpg`,
  dsc1630: `${BASE}/DSC_1630.jpg`,
} as const;

export function homologationImage(
  key: keyof typeof homologationImages,
  index = 1,
): ImageAsset {
  return {
    src: homologationImages[key],
    alt: `Imagem de homologação ${index} — validação de layout`,
    caption: "HOMOLOGATION — imagem temporária, não é conteúdo editorial.",
  };
}
