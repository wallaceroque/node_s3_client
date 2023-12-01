import { argv } from "node:process";
import { createHash } from "crypto"; 

import { GetObjectCommand } from "@aws-sdk/client-s3";

import S3ClientBuilder from "./S3ClientBuilder.mjs";
import config from "./params.json" assert { type : "json" };


const keyObject = argv[2];

const s3Builder = new S3ClientBuilder({
    region: config.region,
    namespace: config.namespace,
    service: config.service,
    user: config.user, 
    secret: config.secret    
});

const s3Client = s3Builder.s3Client;

const getObject = new GetObjectCommand({
    Bucket: config.bucket,
    Key: keyObject/*"teste_wallace_by_nodejs.txt"*/
});


try {
    const object = await s3Client.send(getObject);
    const str = await object.Body.transformToString();

    const hash = createHash("sha256").update(str).digest("hex");
    console.log(`SHA256: ${hash}`);

    console.log(str);

} catch(error) {
    console.log(error)
} finally {
}