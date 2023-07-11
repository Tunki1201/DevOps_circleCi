import type { SSTConfig } from "sst";
import { Api } from "./stacks/Api";
import { Auth } from "./stacks/Auth";
import { Web } from "./stacks/Web";
import { DB } from "./stacks/DB";

export default {
  config(_input) {
    return {
      name: "loopable",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(DB)
      .stack(Auth)
      .stack(Api)
      .stack(Web);
  },
} satisfies SSTConfig;
