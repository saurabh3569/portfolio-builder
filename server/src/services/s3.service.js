const fs = require("fs").promises;
const AWS = require("aws-sdk");
const { env } = require("../config/env.js");

const s3 = new AWS.S3({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
});

const s3Service = {
  uploadFileToS3: async (file, next) => {
    try {
      // Read file async
      const fileContent = await fs.readFile(file.path);

      const params = {
        Bucket: env.AWS_BUCKET_NAME,
        Key: `${Date.now()}-${file.originalname}`,
        Body: fileContent,
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      // Upload to S3
      const data = await s3.upload(params).promise();

      // Delete temp file async
      await fs.unlink(file.path);

      return data.Location; // S3 file URL
    } catch (err) {
      next(err);
    }
  },
  deleteFileFromS3: async (fileUrl) => {
    try {
      if (!fileUrl) return;

      const urlObj = new URL(fileUrl);

      const Key = urlObj.pathname.substring(1);

      await s3
        .deleteObject({
          Bucket: env.AWS_BUCKET_NAME,
          Key,
        })
        .promise();
    } catch (error) {
      console.error("Error deleting file from S3:", error);
    }
  },
};

module.exports = { s3Service };
