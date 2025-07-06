import { useEffect, useState } from "react";
import { fetchResume, fetchJobs } from "./api/api";
import ResumeInfo from "./components/Resumeinfo";
import JobList from "./components/JobList";
import FilterBar from "./components/Filterbar";
import SearchSortBar from "./components/SearchSortBar";

function App() {
  const [resume, setResume] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filterThreshold, setFilterThreshold] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("score");

  const loadData = async () => {
    const resumeData = await fetchResume();
    const jobData = await fetchJobs();
    setResume(resumeData);
    setJobs(jobData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredJobs = jobs
    .filter(
      (job) =>
        Math.round(job.match * 100) >= filterThreshold &&
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "score") {
        return b.match - a.match;
      } else if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-10">🚀 FutureLens Job Matcher</h1>
        
        <ResumeInfo resume={resume} />

        <FilterBar
          filterThreshold={filterThreshold}
          setFilterThreshold={setFilterThreshold}
          refreshData={loadData}
        />

        <SearchSortBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔥 Matching Jobs</h2>
        <JobList jobs={filteredJobs} />
      </div>
    </div>
  );
}

export default App;