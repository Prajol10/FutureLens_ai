function ResumeInfo({ resume }) {
    if (!resume) return <p className="text-gray-500">Loading resume...</p>;
  
    return (
      <div className="bg-white shadow rounded-xl p-6 mb-6 border border-gray-200 max-w-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📄 Resume Summary</h2>
        <p><span className="font-medium">Name:</span> {resume.name}</p>
        <p><span className="font-medium">Email:</span> {resume.email}</p>
        <p><span className="font-medium">Phone:</span> {resume.phone}</p>
        <p><span className="font-medium">Skills:</span> {resume.skills.join(", ")}</p>
      </div>
    );
  }
  export default ResumeInfo;