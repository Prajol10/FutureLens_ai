function JobItem({ job }) {
    return (
      <div className="bg-white shadow-sm hover:shadow-lg transition rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-indigo-700">{job.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{job.company}</p>
        <div className="text-sm">
          Match Score: <span className="font-bold text-green-600">{Math.round(job.match * 100)}%</span>
        </div>
      </div>
    );
  }
  export default JobItem;