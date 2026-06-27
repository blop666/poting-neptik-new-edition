import React from "react";
import { useState } from "react";
import { useCreateCandidate } from "@/backend/hooks/useCandidate";
import {toast} from "sonner"

interface successType {
  onSuccess: () => void
}

export const FormCreate = ({onSuccess}: successType) => {
  const {handleSubmit, isError, isLoading} = useCreateCandidate(onSuccess)

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // alert("Ukuran file terlalu besar! Maksimal 2MB.");
        toast.error("Ukuran file terlalu besar: Maksimal 2 MB")
        return;
      }

      // PROSES JALAN NINJA: Mengubah file gambar menjadi Teks String (Base64)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Hasilnya berupa string panjang "data:image/png;base64,..."
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault(); // Mencegah trigger klik pada label pembungkus
    setImagePreview(null);
  };

  return (
    <div className="">
      <div className="border flex flex-col p-4 gap-1 border-gray-200 rounded-lg">
      {isError && (
        <div className="text-black font-bold text-2xl">
          {isError}
        </div>
      )}
        <span className="text-black font-semibold text-xl">
          Tambah Kandidat
        </span>
        <span className="text-gray-300 text-sm font-normal">
          Lengkapi informasi kondisi dengan benar
        </span>

        <form action={handleSubmit} className="mt-2 flex flex-col gap-6">
          {/* foto section */}
          <div className="flex flex-col">
            <span className="text-black font-bold text-md">Foto Kandidat</span>
            <label
              className={`mt-3 border-2 border-dashed border-red-400 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[180px] cursor-pointer bg-white transition-all duration-200 hover:bg-red-50/10 ${
                imagePreview ? "border-solid border-gray-300" : ""
              }`}
            >
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                name="photoUrl"
                className="hidden"
                onChange={handleFileChange}
              />


              {imagePreview ? (
                /* --- TAMPILAN KETIKA FOTO SUDAH DI-UPLOAD (PREVIEW MODE) --- */
                <div className="relative w-full flex flex-col items-center gap-2">
                  <img
                    src={imagePreview}
                    alt="Preview Kandidat"
                    className="max-h-[120px] object-contain rounded-lg shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-xs font-bold text-red-500 hover:underline mt-1"
                  >
                    Ganti / Hapus Foto
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  {/* SVG Ikon Awan Upload Merah */}
                  <svg
                    className="w-14 h-14 text-red-500 animate-pulse-slow"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                  </svg>

                  {/* Teks Deskripsi */}
                  <span className="text-black font-bold text-lg mt-2">
                    Klik untuk upload foto
                  </span>
                  <span className="text-gray-400 font-medium text-sm mt-0.5">
                    PNG, JPG maksimal 2MB
                  </span>
                </div>
              )}
            </label>
          </div>

          {/* nama section */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-black font-bold text-md">
              Nama Kandidat
            </label>
            <input
              type="text"
              id="name"
              name="username"
              placeholder="Masukan Nama Kandidat"
              className=" text-sm  outline-0 border rounded-sm mt-2 duration-300 ease-in-out  p-2 border-gray-300 focus:border-red-500 focus:border"
            />
          </div>

          {/* Visi Section */}
          <div className="flex flex-col">
            <label htmlFor="visi" className="text-black font-bold text-md">
              Visi
            </label>
            <textarea
              rows={3}
              cols={30}
              id="visi"
              name="vision"
              placeholder="Masukan Visi"
              className=" text-sm  outline-0 border rounded-sm mt-2 duration-300 ease-in-out  p-2 border-gray-300 focus:border-red-500 focus:border"
            />
          </div>

          {/* Misi Section */}
          <div className="flex flex-col">
            <label htmlFor="misi" className="text-black font-bold text-md">
              Misi
            </label>
            <textarea
              rows={3}
              cols={30}
              id="misi"
              name="mission"
              placeholder="Masukan Misi"
              className=" text-sm  outline-0 border rounded-sm mt-2 duration-300 ease-in-out  p-2 border-gray-300 focus:border-red-500 focus:border"
            />
          </div>
          {/* Proker Section */}

          <div className="flex flex-col">
            <label htmlFor="proker" className="text-black font-bold text-md">
              Proker
            </label>
            <textarea
              rows={2}
              cols={30}
              id="proker"
              name="program"
              placeholder="Masukan Proker"
              className=" text-sm  outline-0 border rounded-sm mt-2 duration-300 ease-in-out  p-2 border-gray-300 focus:border-red-500 focus:border"
            />
          </div>

          <div className="flex flex-row gap-2 w-full">
            <button className="w-1/3 border text-gray-400 bg-white border-gray-300 rounded-md py-2 text-center items-center">
              Batal
            </button>

            <button type="submit" className={isLoading ? `text-red-500 bg-white py-2 w-full rounded-lg font-medium` : `text-white bg-red-400 rounded-lg font-medium py-2 w-full`}>
              {isLoading ? "Menyimpan kandidat..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
