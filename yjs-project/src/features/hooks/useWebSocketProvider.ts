import { HocuspocusProvider, WebSocketStatus } from '@hocuspocus/provider';
import { useEffect, useMemo, useState } from 'react';
import type { Doc } from 'yjs';
import { createUser } from "../../utils/createUser.ts";


const websocketUrl = import.meta.env.VITE_HOCUSPOCUS_URL ?? 'ws://127.0.0.1:1234';

export const useWebSocketProvider = (doc: Doc) => {
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [status, setStatus] = useState(WebSocketStatus.Connecting);
  const user = useMemo(
      () => createUser(doc.clientID),
      [doc],
  );

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
    nextProvider.setAwarenessField('user', user);

    return () => {
      isActive = false;
      nextProvider.destroy();
    };
  }, [doc, user]);

  return { provider, status, user };
};
