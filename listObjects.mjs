import { ListObjectsV2Command } from "@aws-sdk/client-s3";

import S3ClientBuilder from "./S3ClientBuilder.mjs";

import config from "./params.json" assert { type : "json" };

const s3Builder = new S3ClientBuilder({
    region: config.region,
    namespace: config.namespace,
    service: config.service,
    user: config.user, 
    secret: config.secret    
});

const s3Client = s3Builder.s3Client;

const listObjects = new ListObjectsV2Command({
    Bucket: config.bucket
});

try {
    /** Lista os buckets do namespace */
    const objects = await s3Client.send(listObjects);
    console.log(objects);

} catch(error) {
    console.log(error)
} finally {
}