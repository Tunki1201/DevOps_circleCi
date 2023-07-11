import { APIGatewayProxyHandlerV2WithJWTAuthorizer } from "aws-lambda";
import { db } from '../../../core/db';

export const handler: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (event) => {
  const id = event.pathParameters.id;

  const record = await db
    .selectFrom("courses")
    .selectAll()
    .where("id", "=", parseInt(id))
    .executeTakeFirst();

  return {
    statusCode: 200,
    body: JSON.stringify(record),
  };
};