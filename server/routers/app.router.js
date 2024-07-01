import express from 'express'
import { getUserDetails } from '../controllers/app.controller.js';

const appRouter = express.Router()


appRouter.route("/get-user-details").post(getUserDetails)


export default appRouter;