import { Server } from '@hocuspocus/server';

const port = Number(process.env.PORT ?? 1234);

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error(`PORT must be an integer between 1 and 65535, got "${process.env.PORT}".`);
}

const server = new Server({
  port,
});

server.httpServer.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(
      `Cannot start Hocuspocus: port ${port} is already in use. Stop the other process or run with a different PORT.`,
    );
  } else {
    console.error('Cannot start Hocuspocus:', error);
  }

  process.exitCode = 1;
});

void server.listen();
