import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";

import { ElizaService } from "@/gen/eliza_connect";

const transport = createConnectTransport({
  baseUrl: "https://localhost:8443",
  httpVersion: "2",
});

async function main() {
  const client = createPromiseClient(ElizaService, transport);
  const res = await client.say({ sentence: "I feel happy." });
  console.log(res);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
