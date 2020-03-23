import React from 'react';
import './App.css';

import Jobs from './components/Jobs';

const mockJobs = [
  {title: 'SWE 1',company: 'Google', },
  {title: 'SWE 1',company: 'FB', },
  {title: 'SWE 1',company: 'Apple', },
  {title: 'SWE 1',company: 'Amazon', }
]

function App() {
  return (
    <div className="App">
      <Jobs jobs={mockJobs}/>
    </div>
  );
}

export default App;
