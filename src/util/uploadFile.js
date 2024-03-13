import AWS from "aws-sdk";
export const uploadFile = async (file) => {
  const S3_BUCKET = "nuaris";
  const REGION = "us-east-1";

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: file.name,
    Body: file,
  };

  var upload = s3
    .putObject(params)
    .on("httpUploadProgress", (evt) => {
      console.log(
        "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
      );
    })
    .promise();

  await upload.then((err, data) => {
    console.log(err);
    alert("File uploaded successfully.");
    return data;
  });
};
