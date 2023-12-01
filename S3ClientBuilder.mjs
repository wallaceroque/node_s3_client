import { S3Client } from "@aws-sdk/client-s3";

export default class S3ClientBuilder {
    #s3Client = null;
    constructor ({
        region = "UTC", 
        namespace, 
        user,
        secret,
        service = '',
        forcePathStyle = true
    }) {
        let accessKeyId = `${user}@${namespace}`;
        let endpoint = `https://${namespace}.${service}`;

        this.#s3Client = new S3Client({
            region: region,
            endpoint: endpoint,
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secret
            },
            forcePathStyle: forcePathStyle
        }); 
    }

    get s3Client() {
        return this.#s3Client;
    } 
}