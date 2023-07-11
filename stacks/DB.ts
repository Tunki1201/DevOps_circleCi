import { use, RDS, StackContext, Api, Cognito } from "sst/constructs";

export function DB({ stack }: StackContext) {
  // Create the Aurora DB cluster
  const rds = new RDS(stack, "db", {
    engine: "mysql5.7",
    defaultDatabaseName: "loopabledb",
    migrations: "services/migrations",
  });

  return rds;
}