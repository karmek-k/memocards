export function randomItem(items: any[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomSubset<T>(items: T[], n: number) {
  const subset: T[] = [];

  for (let i = 0; i < n; ++i) {
    const remaining = items.filter(item => !subset.includes(item));

    if (remaining.length === 0) {
      break;
    }

    subset.push(randomItem(remaining));
  }

  return subset;
}
