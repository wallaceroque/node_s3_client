import { open  } from "node:fs/promises";
import { argv } from "node:process";
import path from "node:path";
import { createHash } from "crypto"; 

import { PutObjectCommand } from "@aws-sdk/client-s3";

import S3ClientBuilder from "./S3ClientBuilder.mjs";
import config from "./params.json" assert { type : "json" };


const filePath = argv[2];
const fileName = path.basename(filePath);

const s3Builder = new S3ClientBuilder({
    region: config.region,
    namespace: config.namespace,
    service: config.service,
    user: config.user, 
    secret: config.secret    
});

const s3Client = s3Builder.s3Client;

const fd = await open(filePath);

const buff = await fd.readFile();

const hash = createHash("sha256").update(buff).digest("hex");
console.log(hash);

const putObject = new PutObjectCommand({
    Bucket: config.bucket,
    ACL: "bucket-owner-read" /*"private"*/,
    ChecksumAlgorithm: "SHA256",
    ChecksumSHA256: hash,
    Body: buff,
    Key: fileName
});


try {
    console.log("Sending object...");
    const result = await s3Client.send(putObject);
    console.log(result);

} catch(error) {
    console.log(error)
} finally {
}

