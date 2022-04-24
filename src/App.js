import "./styles/card.css";
import "./styles/table.css";
import "./styles/badge.css";
import JobsStatusChart from "./components/JobsStatusChart";
import JobsTable from "./components/JobsTable";

function App() {
    return (
      <>
        <div className="mt-5">
          <div className="container-fluid">
            <h1 className="text-center mb-4">Job Queue Monitor</h1>
            <div className="d-flex justify-content-around align-items-center">
              <div className="w-25 ms-5 ps-5">
                <h2>This app monitors the Job Queue in real time</h2>The Chart updates according to job status change
                and corresponding changes are updated on table also
              </div>
              <JobsStatusChart />
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <JobsTable />
            </div>
          </div>
        </div>
      </>
    )
}

export default App;
