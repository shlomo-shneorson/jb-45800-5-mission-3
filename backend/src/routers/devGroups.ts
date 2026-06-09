import { Router } from "express";
import { getAllDevGroup } from "../controllers/devGroup/controller";

const devGroupsRouter = Router()

devGroupsRouter.get('/',getAllDevGroup)

export default devGroupsRouter