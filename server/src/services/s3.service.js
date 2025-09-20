const fs = require("fs").promises;
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { env } = require("../config/env.js");

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const getKeyFromUrl = (url) => {
  const urlObj = new URL(url);
  return urlObj.pathname.substring(1); // remove leading '/'
};

const s3Service = {
  uploadFileToS3: async (file, next) => {
    try {
      // Read local file
      const fileContent = await fs.readFile(file.path);

      const fileKey = `${Date.now()}-${file.originalname}`;

      // Upload to S3
      await s3Client.send(
        new PutObjectCommand({
          Bucket: env.AWS_BUCKET_NAME,
          Key: fileKey,
          Body: fileContent,
          ContentType: file.mimetype,
          ACL: "public-read",
        })
      );

      // Delete temp local file
      await fs.unlink(file.path);

      // Return public URL
      return `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${fileKey}`;
    } catch (err) {
      next(err);
    }
  },

  deleteFileFromS3: async (fileUrl) => {
    try {
      if (!fileUrl) return;

      const Key = getKeyFromUrl(fileUrl);

      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: env.AWS_BUCKET_NAME,
          Key,
        })
      );
    } catch (error) {
      console.error("Error deleting file from S3:", error);
    }
  },
};

module.exports = { s3Service };
