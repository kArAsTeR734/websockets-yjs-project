import { type ReactNode, useEffect, useState } from 'react';
import { IndexeddbPersistence } from 'y-indexeddb';
import * as Y from 'yjs';
import { useWebSocketProvider } from '../features/hooks/useWebSocketProvider.ts';
import { CollaborationContext } from './collaboration-context.ts';

export const CollaborationProvider = ({ children }: { children: ReactNode }) => {
  const [doc] = useState(() => new Y.Doc());
  const [persistence, setPersistence] = useState<IndexeddbPersistence | null>(null);

  const { provider, status } = useWebSocketProvider(doc);

  useEffect(() => {
    const nextPersistence = new IndexeddbPersistence('my-room', doc);
    // IndexedDB is an external resource that only exists after this effect.

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPersistence(nextPersistence);

    return () => {
      nextPersistence.destroy();
    };
  }, [doc]);

  useEffect(
      () => () => {
        doc.destroy();
      },
      [doc],
  );

  const awareness = provider?.awareness;

  if (!provider || !persistence || !awareness) {
    return null;
  }

  return (
      <CollaborationContext.Provider value={{ doc, persistence, provider, awareness, status }}>
        {children}
      </CollaborationContext.Provider>
  );
};
