import { APIGatewayProxyHandlerV2WithJWTAuthorizer  } from "aws-lambda";
import { db } from '../../../core/db';

export const handler: APIGatewayProxyHandlerV2WithJWTAuthorizer  = async (event) => {
  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;

  const result = await db
    .updateTable('courses')
    .set(data)
    .where('id', '=', parseInt(id))
    .executeTakeFirstOrThrow();

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};