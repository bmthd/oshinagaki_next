import { unstable_cache } from "next/cache";

export function cache<T extends (...args: any[]) => any>(
  fn: T,
  options?: {
    revalidate?: number | false;
    tags?: string[];
  }
): T {
  return ((...args: Parameters<T>) => {
    const cacheKey = JSON.stringify(fn) + JSON.stringify(args);
    return unstable_cache(fn, [cacheKey], options)(...args);
  }) as T;
}
