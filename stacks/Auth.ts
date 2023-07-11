import { StackContext, Cognito } from "sst/constructs";

export function Auth({ stack }: StackContext) {
  // Create the Aurora DB cluster
  const auth = new Cognito(stack, "auth", {
    login: ["email"],
  });

  return auth;
}
