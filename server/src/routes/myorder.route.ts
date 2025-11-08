import express from "express"
import { myOrdersController } from "../controllers/myorderController"

const myorderRoute=express.Router()

myorderRoute.get("/my-order/:userId",myOrdersController)

export default myorderRoute