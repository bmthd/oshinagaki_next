import { unstable_cache } from "next/cache";

interface CacheDecoratorOptions {
  revalidate?: number | false;
  tags?: string[];
}

export function cacheDecorator(options?: CacheDecoratorOptions): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const cacheKey = `${target.constructor.name}.${String(propertyKey)}`;
      const cachedFn = unstable_cache(
        originalMethod.bind(this),
        [cacheKey, ...args.map(arg => String(arg))],
        options
      );
      return cachedFn(...args);
    };
    
    return descriptor;
  };
}
