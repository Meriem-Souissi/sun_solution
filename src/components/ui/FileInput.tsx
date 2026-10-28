import React, { ChangeEvent } from "react";
interface FileInputProps {
  label: string;
  required: boolean;
  multiple?: boolean;
  file?: File | null;
  fileList?: FileList | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const FileInput = ({
  label,
  required = false,
  multiple = false,
  file,
  fileList,
  onChange,
}: FileInputProps) => {
  let text = "Choisir un fichier — PDF, JPG ou PNG";
  let hasFile = false;

  if (multiple && fileList && fileList.length > 0) {
    text =
      fileList.length > 1
        ? `${fileList.length} fichiers sélectionnés`
        : fileList[0].name;
    hasFile = true;
  } else if (!multiple && file) {
    text = file.name;
    hasFile = true;
  }

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
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          required={required}
          multiple={multiple}
          onChange={onChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default FileInput;
