import { getAPI } from "./xhr"

export async function getAllJobs() {
  try {
    const response = await getAPI("/getJobs/")
    if (response.statusText === "OK") return response.data
    throw new Error("Response not OK")
  } catch (error) {
    console.log(`Error in fetch... "/getJobs/"`)
    return error
  }
}
