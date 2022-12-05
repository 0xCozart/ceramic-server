import { CeramicClient } from "@ceramicnetwork/http-client";
import { writeFile } from "node:fs/promises";
import { ModelManager } from "@glazed/devtools";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";

const key = fromString(process.env.DID_KEY, "base16");

const did = new DID({
  provide: new Ed25519Provider(key),
  resolver: getResolver(),
});

await did.authenticate();

// Connect to the local Ceramic node
CeramicClient.did = did;

// Create a manger for the model
const manager = new ModelManager({ ceramic });
