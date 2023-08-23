import { unstable_cache } from "next/cache";

export function cache<T extends (...args: any[]) => any>(
  fn: T,
  options?: {
    revalidate?: number | false;
    tags?: string[];
  }
): T {
  return ((...args: Parameters<T>) => {
    return unstable_cache(fn, undefined, options)(...args);
  }) as T;
}
