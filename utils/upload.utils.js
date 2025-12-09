const { cloudinary } = require("../config/cloudinary.config");

exports.uploadToCloudinary = (buffer, folder) => {
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });
  } catch (error) {
    return error || "uploadToCloudinary err";
  }
};
