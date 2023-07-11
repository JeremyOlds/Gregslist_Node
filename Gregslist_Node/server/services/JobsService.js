import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class JobsService {
  async updateJob(jobId, userId, jobData) {
    const foundJob = await this.getJobById(jobId)
    if (foundJob.creatorId.toString() != userId) {
      throw new Forbidden('You are Not Authorized to Delete this Post.')
    }
    foundJob.title = jobData.title || foundJob.title
    foundJob.shift = jobData.shift || foundJob.shift
    foundJob.salary = jobData.salary || foundJob.salary
    foundJob.jobType = jobData.jobType || foundJob.jobType
    foundJob.location = jobData.location || foundJob.location
    foundJob.description = jobData.description || foundJob.description

    foundJob.save()
    return foundJob
  }
  async removeJob(jobId, userId) {
    const foundJob = await this.getJobById(jobId)
    if (foundJob.creatorId.toString() != userId) {
      throw new Forbidden('You are Not Authorized to Delete this Post.')
    }
    await foundJob.remove()
  }
  async createJob(jobData) {
    const newJob = await dbContext.Jobs.create(jobData)

    return newJob
  }
  async getJobById(jobId) {
    const foundJob = await dbContext.Jobs.findById(jobId)
    if (!foundJob) {
      throw new BadRequest(`${jobId} is not a valid ID`)
    }
    return foundJob
  }
  async getJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }

}

export const jobsService = new JobsService()