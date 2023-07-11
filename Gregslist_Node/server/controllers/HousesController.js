import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router

      .get('', this.getHouses)
      .get('/:houseId', this.getHouseById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHouse)
      .delete('/:houseId', this.removeHouse)
      .put('/:houseId', this.updateHouse)
  }
  async getHouses(req, res, next) {
    try {
      const houses = await housesService.getHouses()
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouseById(req, res, next) {
    try {
      const houseId = req.params.houseId
      const foundHouse = await housesService.getHouseById(houseId)
      res.send(foundHouse)
    } catch (error) {
      next(error)
    }
  }

  async createHouse(req, res, next) {
    try {
      const houseData = req.body
      houseData.creatorId = req.userInfo.id

      const house = await housesService.createHouse(houseData)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }
  async removeHouse(req, res, next) {
    try {
      const houseId = req.params.houseId
      const userId = req.userInfo.id
      await housesService.removeHouse(houseId, userId)
      res.send('House has been Deleted!')
    } catch (error) {
      next(error)
    }
  }
  async updateHouse(req, res, next) {
    try {
      const houseId = req.params.houseId
      const houseData = req.body
      const userId = req.userInfo.id
      const updatedHouse = await housesService.updateHouse(houseId, userId, houseData)
      res.send(updatedHouse)
    } catch (error) {
      next(error)
    }
  }
}