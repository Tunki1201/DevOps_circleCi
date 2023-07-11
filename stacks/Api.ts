import { use, StackContext, Api as ApiGateway, Cognito } from "sst/constructs";
import { DB } from './DB';
import { Auth } from './Auth';

export function Api({ stack, app }: StackContext) {

  const auth = use(Auth);
  const db = use(DB);

  // Create Api
  const api = new ApiGateway(stack, "api", {
    authorizers: {
      jwt: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "jwt",
      function: {
        bind: [db],
        environment: {
          APP_REGION: app.region,
          USER_POOL_ID: auth.userPoolId,
          USER_POOL_CLIENT_ID: auth.userPoolClientId,
        },
      }
    },
    routes: {
      "GET /courses": {
        function: "packages/functions/src/course/list.handler",
        authorizer: "none",
      },
      "POST /courses": "packages/functions/src/course/create.handler",
      "GET /courses/{id}": {
        function: "packages/functions/src/course/get.handler",
        authorizer: "none",
      },
      "PUT /courses/{id}": "packages/functions/src/course/update.handler",
      "DELETE /courses/{id}": "packages/functions/src/course/delete.handler",
    },
  });

  // Allow authenticated users invoke API
  auth.attachPermissionsForAuthUsers(stack, [api]);

  // Show the API endpoint and other info in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });

  return api;
}
