import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class HousesService {
  async getHouses() {
    const houses = await dbContext.Houses.find()
    return houses
  }
  async getHouseById(houseId) {
    const foundHouse = await dbContext.Houses.findById(houseId)
    if (!foundHouse) {
      throw new BadRequest(`${houseId} is not a valid ID`)
    }
    return foundHouse
  }
  async createHouse(houseData) {
    const newHouse = await dbContext.Houses.create(houseData)

    return newHouse
  }
  async removeHouse(houseId, userId) {
    const foundHouse = await this.getHouseById(houseId)

    if (foundHouse.creatorId.toString() != userId) {
      throw new Forbidden('You are Not Authorized to Delete this Post.')
    }
    await foundHouse.remove()
  }
  async updateHouse(houseId, userId, houseData) {
    const foundHouse = await this.getHouseById(houseId)

    if (foundHouse.creatorId.toString() != userId) {
      throw new Forbidden('You are Not Authorized to Delete this Post.')
    }
    foundHouse.address = houseData.address || foundHouse.address
    foundHouse.bedrooms = houseData.bedrooms || foundHouse.bedrooms
    foundHouse.bathrooms = houseData.bathrooms || foundHouse.bathrooms
    foundHouse.sqft = houseData.sqft || foundHouse.sqft
    foundHouse.price = houseData.price || foundHouse.price
    foundHouse.imgUrl = houseData.imgUrl || foundHouse.imgUrl

    await foundHouse.save()

    return foundHouse
  }


}

export const housesService = new HousesService()