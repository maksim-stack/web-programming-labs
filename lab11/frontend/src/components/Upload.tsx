import { useState, useEffect } from "react";
import { uploadFile } from "../api/files";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const res = await uploadFile(file, setProgress);
      setResultUrl(res.data.url);
    } catch (e) {
      alert("Upload error");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {preview && (
        <div>
          <p>Preview:</p>
          <img src={preview} width={200} />
        </div>
      )}

      {file && (
        <div>
          <p>{file.name}</p>
          <p>{(file.size / 1024).toFixed(1)} KB</p>
        </div>
      )}

      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>

      <div>
        Progress: {progress}%
      </div>

      {resultUrl && (
        <div>
          <h3>Uploaded:</h3>
          <img src={resultUrl} width={300} />
        </div>
      )}
    </div>
  );
}