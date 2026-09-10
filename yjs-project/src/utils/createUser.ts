export function createUser(clientId: number) {
  const suffix = clientId.toString(36).toUpperCase();
  const hue = clientId % 360;

  return {
    id: clientId,
    name: `User-${suffix}`,
    color: `hsl(${hue} 70% 50%)`,
  };
}

