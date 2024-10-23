import { cloudinaryInstance } from "../../../config/cloudinary-config.js"

export const cloudinaryImageUploader = async (file_path) => {
    const result = await cloudinaryInstance.uploader.upload(file_path, async (err, result) => {
        if (err) {
            console.log(err, "error");
            return res.status(500).json({
                status: false,
                error: "Error"
            })
        }
    });

    return result;
}