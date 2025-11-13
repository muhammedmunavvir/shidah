"use client";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { ProductImageUploadApi } from "@/api/adminapi";
import { toast } from "sonner";

export default function UploadImage({ onUpload }: { onUpload: (url: string) => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: ProductImageUploadApi,
    onSuccess: (data) => {
      if (data?.url) {
        onUpload(data.url);
        toast.success("Image uploaded!");

        // clear single preview after upload
        clearUploads();
      }
    },
    onError: () => toast.error("Image upload failed"),
  });

  const clearUploads = () => {
    setFiles([]);
    setPreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

const handleFiles = (selectedFiles: File[]) => {
  const validFiles: File[] = [];
  const invalidFiles: File[] = [];

  selectedFiles.forEach((file) => {
    if (allowedTypes.includes(file.type)) {
      validFiles.push(file);
    } else {
      invalidFiles.push(file);
    }
  });

  if (invalidFiles.length > 0) {
    toast.error("❌ Only image files are allowed!");
  }

  setFiles(validFiles);
  setPreviews(validFiles.map((file) => URL.createObjectURL(file)));
};

  
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    const selectedFiles = Array.from(e.target.files) as File[];
    handleFiles(selectedFiles);
  }
};

  const handleDrop = (e:  React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files)as File[];
    handleFiles(droppedFiles);
  };

  const allowDrop = (e: any) => e.preventDefault();

 const uploadAll = () => {
  if (!files.length) {
    toast.error("Please select image files");
    return;
  }

  files.forEach((file) => mutate(file));
};


  return (
    <div className="space-y-3">

      {/* Drag & Drop Box */}
      <div
        onDrop={handleDrop}
        onDragOver={allowDrop}
        className="border-2 border-dashed border-gray-400 p-6 rounded-xl text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <p className="text-gray-500">Drag & drop images here</p>
        <p className="text-sm">or click below</p>
      </div>

      {/* File input */}
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* Preview */}
      <div className="flex gap-3 flex-wrap">
        {previews.map((src, i) => (
          <img
            key={i}
            src={src}
            className="w-24 h-24 object-cover rounded-md border"
          />
        ))}
      </div>

      {/* Upload Button */}
      <button
        type="button"
        onClick={uploadAll}
        disabled={isPending || !files.length}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
      >
        {isPending ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
}
