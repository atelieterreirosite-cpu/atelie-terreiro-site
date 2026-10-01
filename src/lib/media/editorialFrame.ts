/**
 * Alinhamento vertical de moldura editorial (object-contain):
 * - mobile: sempre centralizado
 * - lg+: imagem larga (width > height) → topo; imagem alta/quadrada → centro
 */
export function editorialFrameAlignClass(width?: number, height?: number): string {
  const known = Boolean(width && height && width > 0 && height > 0);
  const isWide = known && width! > height!;

  if (isWide) {
    return "items-center justify-center lg:items-start";
  }

  return "items-center justify-center";
}
