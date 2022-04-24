import { Chart } from "@antv/g2"
import { useEffect, useRef } from "react"
import { getJobStatusCounts } from "../adapters/getJobStatusCountsAdapter"
import { jobStatusNames } from "../constants/jobStatusConstants"

const JobsStatusChart = () => {
  const chartNodeRef = useRef()
  const fetchTimeoutID = useRef()

  useEffect(() => {
    const chart = new Chart({
      container: chartNodeRef.current,
      width: 600,
      height: 300,
      padding: [10, 10, 45, 40]
      // forceFit: true // adjust to width of container when no width provided
    })
    chart.data([
      {
        job_status: "i",
        status_count: 0
      },
      {
        job_status: "e",
        status_count: 0
      },
      {
        job_status: "c",
        status_count: 0
      },
      {
        job_status: "f",
        status_count: 0
      }
    ])
    chart.scale("job_status", {
      formatter: (val) => jobStatusNames.get(val)
    })
    chart.interval().position("job_status*status_count").color("job_status")
    chart.render()

    async function fetchJobStatusCount() {
      try {
        const response = await getJobStatusCounts()
        const data = response?.data
        if (data?.length) {
          chart.changeData(data)
        } else throw new Error("No Count Data")
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
      chart?.destroy?.()
    }
  }, [])

  return (
    <>
      <div className="card">
        <div className="card-header pb-0">
          <h6>Job Status Overview</h6>
        </div>
        <div className="card-body p-3">
          <div ref={chartNodeRef}></div>
        </div>
      </div>
    </>
  )
}

export default JobsStatusChart
