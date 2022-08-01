
/**
 * Get a random number to use as a cache buster in analytics pixel URLs
 * @returns number
 *
 * @internal
 */
export function calculateSeed(): number {
  return Date.now() + Math.floor(1000 * Math.random());
}