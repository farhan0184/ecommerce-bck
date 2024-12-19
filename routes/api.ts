import { Router } from "express";
import userRoutes from "./api/user.routers";


const apiRoutes = Router();

apiRoutes.use('/user', userRoutes)

export default apiRoutes