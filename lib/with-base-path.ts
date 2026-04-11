const PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(src: string): string {
  if (!src.startsWith("/") || src.startsWith("//")) {
    return src;
  }
  return `${PUBLIC_BASE_PATH}${src}`;
}
