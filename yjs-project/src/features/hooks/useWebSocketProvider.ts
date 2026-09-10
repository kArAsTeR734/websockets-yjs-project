import { HocuspocusProvider, WebSocketStatus } from '@hocuspocus/provider';
import { useEffect, useState } from 'react';
import type { Doc } from 'yjs';

const websocketUrl = import.meta.env.VITE_HOCUSPOCUS_URL ?? 'ws://127.0.0.1:1234';

export const useWebSocketProvider = (doc: Doc) => {
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [status, setStatus] = useState(WebSocketStatus.Connecting);

  useEffect(() => {
    let isActive = true;
    const nextProvider = new HocuspocusProvider({
      url: websocketUrl,
      name: 'my-room',
      document: doc,
      onStatus: ({ status: nextStatus }) => {
        if (isActive) {
          setStatus(nextStatus);
        }
      },
    });

    // Creating the socket in an effect keeps React StrictMode from leaking the
    // throw-away provider it creates during its development-only extra render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProvider(nextProvider);
    nextProvider.setAwarenessField('user', {
      name: 'Nikita',
      color: '#7c3aed',
    });

    return () => {
      isActive = false;
      nextProvider.destroy();
    };
  }, [doc]);

  return { provider, status };
};
