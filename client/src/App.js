import React, { useState, useEffect } from "react";
import "./App.css";

import Jobs from "./components/Jobs";

const JOB_API_URL = "http://localhost:3001/jobs";

async function fetchJobs(updateJobs) {
    const res = await fetch(JOB_API_URL);
    let data = await res.json();
    console.log(data[0]);
    updateJobs(data)
}

function App() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    fetchJobs(setJobs);
  }, [])

    return (
        <div className="App">
            <Jobs jobs={jobs} />
        </div>
    );
}

export default App;
