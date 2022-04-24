import { getAPI } from "./xhr"

export async function getJobStatusCounts() {
  try {
    const response = await getAPI("/getJobStatusCounts/")
    if (response.statusText === "OK") return response.data
    throw new Error("Response not OK")
  } catch (error) {
    console.log(`Error in fetch... "/getJobStatusCounts/"`);
    return error
  }
}
