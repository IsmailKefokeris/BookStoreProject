const { S3 } = require("aws-sdk");
const uuid = require("uuid").v4;

//Imports for V3 AWS S3
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

exports.s3Uploadv2 = async (files) => {
    const s3 = new S3(); // REmember to update credentials in the env variables

    const params = files.map((file) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `test-uploads/${uuid()}-${
                file.originalname.toLowerCase().split(".")[0]
            }.${file.mimetype.split("/")[1]}`, // This is the name of our file after uploaded
            Body: file.buffer, // This is the actual file
            ContentType: file.mimetype, // This is the type of file
        };
    });

    const results = await Promise.all(
        params.map((param) => s3.upload(param).promise())
    );

    // const results = await s3.upload(params).promise();

    return results;
};

exports.s3Uploadv3 = async (files) => {
    const s3client = new S3Client();

    // const file_name = `${uuid()}-${
    //     file.originalname.toLowerCase().split(".")[0]
    // }.${file.mimetype.split("/")[1]}`;

    // const params = {
    //     Bucket: process.env.AWS_BUCKET_NAME,
    //     Key: `test-uploads/${file_name}`, // This is the name of our file after uploaded
    //     Body: file.buffer, // This is the actual file
    //     ContentType: file.mimetype, // This is the type of file
    //     Region: process.env.AWS_REGION,
    // };

    var urls = [];

    const params = files.map((file) => {
        const file_name = `${uuid()}-${
            file.originalname.toLowerCase().split(".")[0]
        }.${file.mimetype.split("/")[1]}`;

        urls.push(`${process.env.AWS_URL_OBJECT_V3}${file_name}`);

        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `test-uploads/${file_name}`, // This is the name of our file after uploaded
            Body: file.buffer, // This is the actual file
            ContentType: file.mimetype, // This is the type of file
        };
    });

    // const results = await s3client.send(new PutObjectCommand(params));

    // const results = await Promise.all(
    //     params.map((param) => s3client.send(new PutObjectCommand(param)))
    // );

    const results = "YAY"; // Comment this out and then uncomment the line above for real results.

    // SAVE URL TO DATABASE HERE
    console.log(`Save files to Database with URLs: ${urls}`);

    return { results, Locations: urls };
};
