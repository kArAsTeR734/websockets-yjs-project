import type { HocuspocusProvider, WebSocketStatus } from '@hocuspocus/provider';
import { createContext } from 'react';
import type { IndexeddbPersistence } from 'y-indexeddb';
import type { Awareness } from 'y-protocols/awareness';
import type { Doc } from 'yjs';

export interface CollaborationType {
  doc: Doc;
  persistence: IndexeddbPersistence;
  provider: HocuspocusProvider;
  awareness: Awareness;
  status: WebSocketStatus;
}

export const CollaborationContext = createContext<CollaborationType | null>(null);
