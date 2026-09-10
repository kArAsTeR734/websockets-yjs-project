import type { Awareness } from "y-protocols/awareness";

interface UserInfo {
  name?: string;
  color?: string;
}

export interface ActiveUser {
  clientId: number;
  name: string;
  color?: string;
}

export function readUsers(awareness: Awareness): ActiveUser[] {
  return Array.from(awareness.getStates()).flatMap(([clientId, state]) => {
    const user = state.user as
        | UserInfo
        | undefined;

    if (!user?.name) {
      return []
    }

    return [
      {
        clientId,
        name: user.name,
        color: user.color,
      }
    ]
  })
}