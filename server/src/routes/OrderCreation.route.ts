import express from "express"
import { createOrder, verifyPayment } from "../controllers/BookingControllers.js"

const Ordercreationroute=express.Router()

Ordercreationroute.post("/create/:userId",createOrder)
Ordercreationroute.post("/verify",verifyPayment)

export default Ordercreationroute