import { useState } from "react";

interface EditDetailsProps {
  details: string;
  onSave: (newDetails: string) => void;
  onCancel: () => void;
}

export default function EditDetails({ details, onSave, onCancel }: EditDetailsProps) {
  const [value, setValue] = useState(details);

  return (
    <div className="flex flex-col items-center gap-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        className="w-full p-2 rounded-lg bg-neutral-800 text-white border border-gray-500"
      />
      <div className="flex gap-6">
        <button
          onClick={() => onSave(value)}
          className="cursor-pointer hover:text-green-400 rounded text-white"
        >
          Salvar
        </button>
        <button
          onClick={onCancel}
          className="rounded hover:text-red-400 cursor-pointer text-white"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
