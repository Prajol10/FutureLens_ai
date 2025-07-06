import JobItem from "./JobItem";

function JobList({ jobs }) {
  if (!jobs || jobs.length === 0) return <p>Loading jobs...</p>;

  return (
    <div>
      {jobs.map((job, i) => (
        <JobItem key={i} job={job} />
      ))}
    </div>
  );
}

export default JobList;