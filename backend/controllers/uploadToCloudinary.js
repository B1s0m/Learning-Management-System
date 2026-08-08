
const cloudinary = require("../config/cloudinary");

function uploadToCloudinary({fileBuffer, type, foldername}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: foldername,
        resource_type: type,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
}

module.exports = uploadToCloudinary;

///  resource_type: "raw",
///  resource_type: "image",