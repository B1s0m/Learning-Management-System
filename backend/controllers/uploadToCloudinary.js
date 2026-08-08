
const cloudinary = require("../config/cloudinary");

function uploadToCloudinary({fileBuffer, type, foldername,filename}) {
  return new Promise((resolve, reject) => {
     const options = {
        folder: foldername,
        resource_type: type,
      }

    if (filename) {
      options.public_id = filename
    }
         
    const stream = cloudinary.uploader.upload_stream(
      options ,
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