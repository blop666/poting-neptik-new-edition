import { useGetCandidate } from "@/backend/hooks/useCandidate";
import { MdEdit, MdDelete } from "react-icons/md";


export const CandidateListContent = ({ 
  setEditingCandidate, 
  triggerDelete 
}: { 
  setEditingCandidate: (item: any) => void; 
  triggerDelete: (id: number, name: string) => void;
}) => {
  // Hook dipanggil di sini agar ikut ter-fetch ulang saat komponen ini di-remount
  const { candidates } = useGetCandidate();

  return (
    <>
      {candidates.map((item, index) => (
        <div
          key={item.id}
          className="border mt-4 border-gray-200 rounded-lg p-4 gap-4 flex flex-row"
        >
          <div className="bg-white rounded-lg border-gray-300 border">
            <img
              src={item.photoUrl || "/placeholdernew.png"}
              alt="candidate"
              className="w-[160px] h-[206px] object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col gap-1 text-left">
              <span className="text-black/80 font-bold text-lg">
                {index + 1} - {item.name}
              </span>

              <div className="flex flex-col">
                <span className="text-red-500 text-[12px] font-bold">Visi</span>
                <span className="text-gray-400 font-medium text-[10px]">
                  {item.vision}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-red-500 text-[12px] font-bold">Misi</span>
                <ul className="text-gray-400 font-medium text-[11px] list-disc list-inside space-y-0.5">
                  {item.mission.split("\n").map((misiText, indexMisi) => (
                    <li key={indexMisi}>{misiText}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-row gap-10 justify-center">
              <div className="flex flex-col text-center">
                <span className="text-black text-3xl font-bold">
                  {item.voteCount}
                </span>
                <span className="text-sm font-medium text-black">Suara</span>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setEditingCandidate(item)}
                  className="flex flex-row gap-3 cursor-pointer text-black font-bold hover:text-red-500 transition-colors"
                >
                  <MdEdit className="w-5 h-5" />
                  <span className="text-sm">Edit</span>
                </button>

                <button
                  onClick={() => triggerDelete(item.id, item.name)}
                  className="flex flex-row gap-1 text-black font-bold hover:text-red-700 transition-colors"
                >
                  <MdDelete className="w-5 h-5 text-red-500" />
                  <span className="text-red-500 text-sm">Hapus</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};