import React, { ChangeEvent, useRef } from "react";
interface FileInputProps {
  label: string;
  required: boolean;
  multiple?: boolean;
  file?: File | null;
  fileList?: FileList | File[] | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove?: (index?: number) => void;
}
const FileInput = ({
  label,
  required = false,
  multiple = false,
  file,
  fileList,
  onChange,
  onRemove,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Convertit FileList ou File[] en un vrai tableau facile à manipuler
  const filesArray: File[] = fileList ? Array.from(fileList) : [];

  let text = "Choisir un fichier — PDF, JPG ou PNG";
  let hasFile = false;

  if (multiple && filesArray.length > 0) {
    text =
      filesArray.length > 1
        ? `${filesArray.length} fichiers sélectionnés`
        : filesArray[0].name;
    hasFile = true;
  } else if (!multiple && file) {
    text = file.name;
    hasFile = true;
  }
  console.log("filesArray", filesArray);
  console.log("fileList", fileList);

  // Suppression d'un fichier unique (mode simple)
  const handleRemoveSingle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (onRemove) {
      onRemove();
    }
  };

  // Suppression d'un fichier précis par son index (mode multiple)
  const handleRemoveMultipleItem = (indexToRemove: number) => {
    if (inputRef.current) {
      // Met à jour la FileList native du navigateur pour que `required` reste valide
      const dt = new DataTransfer();
      filesArray.filter((f, idx) => {
        if (idx !== indexToRemove) dt.items.add(f);
      });
      inputRef.current.files = dt.files;
    }

    if (onRemove) {
      onRemove(indexToRemove);
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-(--ink) mb-2">
        {label}
      </label>
      <label
        className={`flex items-center gap-3 border rounded-lg p-3.5 cursor-pointer transition-all ${
          hasFile
            ? "border-(--forest) bg-(--sage)"
            : "border-dashed border-(--line) bg-(--cream) hover:border-(--forest)-soft"
        }`}
      >
        <svg
          className="w-4 h-4 text-forest shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <path d="M12 16V4M7 9l5-5 5 5" />
          <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
        </svg>
        <span
          className={`text-xs truncate ${hasFile ? "text-(--ink) font-semibold" : "text-slate-custom"}`}
        >
          {text}
        </span>

        {/* Bouton supprimer pour un fichier unique */}
        {!multiple && hasFile && onRemove && (
          <button
            type="button"
            onClick={handleRemoveSingle}
            title="Supprimer le fichier"
            className="cursor-pointer p-1 text-(--ink) hover:text-(--terracotta) transition-colors shrink-0"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          required={required}
          multiple={multiple}
          onChange={onChange}
          className="hidden"
        />
      </label>
      {/* Liste des fichiers en mode multiple avec suppression individuelle */}
      {multiple && filesArray.length > 0 && (
        <ul className="mt-2 space-y-1.5 flex gap-2 flex-wrap">
          {filesArray.map((item, index) => (
            <li
              key={`${item.name}-${index}`}
              className="max-w-40 flex items-center justify-between gap-2 text-xs bg-(--cream) border border-(--line) rounded-md px-3 py-1.5"
            >
              <span className="truncate text-(--ink)">{item.name}</span>
              {onRemove && (
                <button
                  type="button"
                  onClick={() => handleRemoveMultipleItem(index)}
                  title="Supprimer ce fichier"
                  className="cursor-pointer text-(--ink) hover:text-(--terracotta) transition-colors shrink-0 p-0.5"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileInput;
