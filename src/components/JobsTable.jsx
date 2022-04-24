import { useEffect, useRef, useState } from "react"
import { getAllJobs } from "../adapters/getJobsAdapter"
import { badgeClasses, jobStatusNames } from "../constants/jobStatusConstants"

const JobsTable = () => {
  const fetchTimeoutID = useRef()
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    async function fetchJobStatusCount() {
      try {
        const response = await getAllJobs()
        const data = response?.data
        if (data?.length) {
          setTableData(data)
        } else throw new Error("No- All Jobs Data")
      } catch (error) {
        console.log(error)
      } finally {
        fetchTimeoutID.current = setTimeout(() => {
          fetchJobStatusCount()
        }, 4000)
      }
    }
    fetchJobStatusCount()

    return () => {
      if (fetchTimeoutID.current) clearTimeout(fetchTimeoutID.current)
    }
  }, [])
  return (
    <>
      <div className="card">
        <div className="card-header pb-0">
          <h6>Detailed Job Status</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive table-wrapper-scroll-y">
            <table className="table table-hover align-middle text-nowrap">
              <thead className="table-light text-center">
                <tr>
                  <th aria-label="Job ID">Job ID</th>
                  <th aria-label="Job Name">Job Name</th>
                  <th aria-label="Job Status">Job Status</th>
                  <th aria-label="Created At">Created At</th>
                  <th aria-label="Updated At">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.job_id}>
                    <td>{row.job_id}</td>
                    <td>{row.job_name}</td>
                    <td>
                      <span className={`${badgeClasses.get(row.job_status)} badge rounded-pill`}>
                        {jobStatusNames.get(row.job_status)}
                      </span>
                    </td>
                    <td>{new Date(row.created_at).toLocaleString("en-GB", { timeZone: "UTC" })}</td>
                    <td>{new Date(row.updated_at).toLocaleString("en-GB", { timeZone: "UTC" })}</td>
                  </tr>
                ))}
                {/* <tr>
                  <td>7160df61-7d22-b329-3df7-23279db860fe</td>
                  <td>day2 express test b3 2109</td>
                  <td>
                    <span className={`${badgeClasses.get("e")} badge rounded-pill`}>jobStatusNames.get("i")</span>
                  </td>
                  <td>2022-04-24T06:03:02.944Z</td>
                  <td>2022-04-24T06:03:02.944Z</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobsTable
