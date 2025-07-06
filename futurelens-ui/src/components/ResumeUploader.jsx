function ResumeUploader({ onUpload }) {
    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append("resume", file);
  
      const res = await fetch("http://localhost:5050/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      onUpload(data);
    };
  
    return (
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-2">Upload Resume:</label>
        <input
          type="file"
          accept=".txt,.pdf"
          onChange={handleFileChange}
          className="block w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>
    );
  }
  
  export default ResumeUploader;