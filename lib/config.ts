import convict from "convict";
import dotenv from "dotenv";
import {getLocalIP} from "../next.config.mjs";

  const api_url = `https://${getLocalIP()}:3000`;

  // api_url: `https://circlecard.fun`,


export const config = convict({
    apiurl: {
      default: api_url,
      format: String,
      env: "API_URL",
    },
    rpcurl: {
      default: "https://devnet.helius-rpc.com/?api-key=f4c86c47-1d8b-4148-9dc6-d9aa6496f788",
      format: String,
      env: "RPC_URL",
    }
}
);

dotenv.config();
