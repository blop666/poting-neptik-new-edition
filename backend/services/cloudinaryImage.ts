import axios from "axios";

const uploadToCloudinary = async (file: File) => {
    const cloud_name= "dlnffdgtc"
    const preset="ml_default"

    const formData = new FormData();
    formData.append("file", file)
    formData.append("upload_preset", preset)

    try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Cloudinary Error Response:", errText);
      return null; 
    }

    const data = await response.json();
    console.log("Respon Mentah dari Cloudinary:", data);

    // KUNCI UTAMA: Pastikan mengembalikan .secure_url dalam bentuk string
    if (data && data.secure_url) {
      return data.secure_url; 
    }
    
    return null;
  } catch (error) {
    console.error("Crash saat hit API Cloudinary:", error);
    return null; // 👈 Harus ada return null di catch biar gak jadi undefined!
  }
}

export {uploadToCloudinary}