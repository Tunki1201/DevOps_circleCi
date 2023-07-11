import crypto from "crypto";
import { Bucket } from "sst/node/bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
    const command = new PutObjectCommand({
        ACL: "public-read",
        Key: crypto.randomUUID(),
        Bucket: Bucket.public.bucketName,
    });
    const url = await getSignedUrl(new S3Client({}), command);

    return {
        BUCKET_URL: url,
        API_ENDPOINT: PUBLIC_API_ENDPOINT
    };
}) satisfies PageServerLoad;