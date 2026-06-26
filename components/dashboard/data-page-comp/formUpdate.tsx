import React, { useState, useEffect } from "react";
import { useUpdateCandidate } from "@/backend/hooks/useCandidate"; // sesuaikan hook lu

interface FormUpdateSideProps {
  candidate: any;
  onCancel: () => void;
  onSuccess: () => void;
}

export const FormUpdateSide = ({
  candidate,
  onCancel,
  onSuccess,
}: FormUpdateSideProps) => {
  const { handleUpdate, isLoading, fieldErrors } = useUpdateCandidate(
    candidate.id,
    candidate.photoUrl,
    onSuccess,
    
  );
  const [imagePreview, setImagePreview] = useState<string | null>(
    candidate.photoUrl,
  );

  // Sync ulang preview jika user ganti klik kandidat lain di kiri
  useEffect(() => {
    setImagePreview(candidate.photoUrl);
  }, [candidate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="border flex flex-col p-4 gap-1 border-gray-200 rounded-lg bg-white shadow-sm">
      <span className="text-black font-semibold text-xl text-amber-600">
        Edit Kandidat
      </span>
      <span className="text-gray-400 text-sm font-normal">
        Ubah informasi kandidat terpilih
      </span>

      <form action={handleUpdate} className="mt-2 flex flex-col gap-6">
        {fieldErrors.global && (
          <div className="text-red-500 text-sm">{fieldErrors.global}</div>
        )}
        {/* Foto Section */}
        <div className="flex flex-col">
          <label className="mt-3 border-2 border-dashed border-amber-400 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[180px] cursor-pointer">
            <input
              type="file"
              name="photoUrl"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {imagePreview ? (
              <div className="flex flex-col items-center gap-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-[120px] object-contain rounded-lg"
                />
                <span className="text-xs text-amber-500 font-bold">
                  Klik untuk ganti foto
                </span>
              </div>
            ) : (
              <span className="text-sm text-gray-400">Belum ada foto</span>
            )}
          </label>
        </div>

        {/* Input Nama */}
        <div className="flex flex-col">
          <label className="text-black font-bold text-md">Nama Kandidat</label>
          <input
            type="text"
            name="name"
            defaultValue={candidate.name}
            className="text-sm border rounded-sm mt-2 p-2"
          />
        </div>

        {/* Input Visi */}
        <div className="flex flex-col">
          <label className="text-black font-bold text-md">Visi</label>
          <textarea
            name="vision"
            rows={3}
            defaultValue={candidate.vision}
            className="text-sm border rounded-sm mt-2 p-2"
          />
        </div>

        {/* Input Misi */}
        <div className="flex flex-col">
          <label className="text-black font-bold text-md">Misi</label>
          <textarea
            name="mission"
            rows={3}
            defaultValue={candidate.mission}
            className="text-sm border rounded-sm mt-2 p-2"
          />
        </div>

        {/* Input Proker */}
        <div className="flex flex-col">
          <label className="text-black font-bold text-md">Proker</label>
          <textarea
            name="program"
            rows={2}
            defaultValue={candidate.program?.join("\n")}
            className="text-sm border rounded-sm mt-2 p-2"
          />
        </div>

        {/* Tombol */}
        <div className="flex flex-row gap-2 w-full">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/3 border text-gray-500 rounded-md py-2 text-sm"
          >
            Batal
          </button>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white rounded-lg font-medium py-2 text-sm"
          >
            {isLoading ? "Mengupdate..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
};
