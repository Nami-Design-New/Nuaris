import AWS from "aws-sdk";

export const uploadFile = async (file) => {
  const S3_BUCKET = "nuaris";
  const REGION = "us-east-1";

  AWS.config.update({
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
    region: REGION
  });

  const s3 = new AWS.S3();

  const params = {
    Bucket: S3_BUCKET,
    Key: file.name,
    Body: file
  };

  return new Promise((resolve, reject) => {
    s3.putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .send((err, data) => {
        if (err) {
          console.error("Upload failed:", err);
          reject(err);
        } else {
          console.log("File uploaded successfully.", data);
          resolve(data);
        }
      });
  });
};
