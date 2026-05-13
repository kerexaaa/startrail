export function getJ2000Angle(orbitalPeriodDays: number): number {
  const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
  const now = Date.now();

  const daysSinceJ2000 = (now - J2000) / (1000 * 60 * 60 * 24);

  const orbitsCompleted = daysSinceJ2000 / orbitalPeriodDays;

  const currentFraction = orbitsCompleted % 1;

  return currentFraction * (Math.PI * 2);
}
