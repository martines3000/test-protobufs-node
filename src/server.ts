import { fastify } from "fastify";
import { fastifyConnectPlugin } from "@connectrpc/connect-fastify";
import routes from "./connect";
import { readFileSync } from "node:fs";

async function main() {
  const server = fastify({
    http2: true,
    https: {
      key: readFileSync("localhost+2-key.pem", "utf8"),
      cert: readFileSync("localhost+2.pem", "utf8"),
    },
  });
  await server.register(fastifyConnectPlugin, {
    routes,
  });

  server.get("/", (_, reply) => {
    reply.type("text/plain");
    reply.send("Hello World!");
  });

  await server.listen({ host: "localhost", port: 8443 });
  console.log("server is listening at", server.addresses());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
