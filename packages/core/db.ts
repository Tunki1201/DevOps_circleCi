import { RDSData } from "@aws-sdk/client-rds-data";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";

interface Database {
  courses: {
    id: number;
    name: string;
    file: string | null;
  };
}

export const db = new Kysely<Database>({
  dialect: new DataApiDialect({
    mode: "mysql",
    driver: {
      database: RDS.db.defaultDatabaseName,
      secretArn: RDS.db.secretArn,
      resourceArn: RDS.db.clusterArn,
      client: new RDSData({}),
    },
  }),
});