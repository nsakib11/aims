import axios from "axios";

export const uploadImageToCloudinary = async (file: File, folder: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "academicims");
  formData.append("folder", folder);
  // Replace with your Cloudinary upload preset

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dlwjznjcj/image/upload", // Replace with your Cloudinary cloud name
      formData,
    );
    return response.data.secure_url; // Return the image URL
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};
