"use client";
import { useState } from "react";

export default function UploadImage({ onUpload }: { onUpload: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {  // 👈 Next.js API route
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (data.url) {
      onUpload(data.url); // return uploaded URL to parent (ProductForm)
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" className="w-40 rounded-md" />}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
