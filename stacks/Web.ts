import { use, SvelteKitSite, StackContext, Bucket } from "sst/constructs";
import { Api } from './Api';
import { Auth } from './Auth';

export function Web({ stack, app }: StackContext) {
  const auth = use(Auth);
  const api = use(Api);
  const bucket = new Bucket(stack, "public");

  const site = new SvelteKitSite(stack, "site", {
    bind: [bucket],
    environment: {
      PUBLIC_API_ENDPOINT: api.url,
      PUBLIC_APP_REGION: app.region,
      PUBLIC_USER_POOL_ID: auth.userPoolId,
      PUBLIC_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    SiteUrl: site.url,
  });
}
