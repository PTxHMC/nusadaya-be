import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.APP_CLOUDINARY_API_KEY,
  api_secret: process.env.APP_CLOUDINARY_API_SECRET,
});

const uploads = async (filePath, folder) => {
  const cloudUpload = await cloudinary.uploader.upload(
    filePath,
    { folder: folder },
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      return result.url;
    }
  );

  const url = cloudUpload.url;

  return url;
};

export default uploads;
