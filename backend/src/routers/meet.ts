import { Router } from "express";
import { deleteMeet, getMeatDetailsById, getMeetByDevGroup, newMeet, updateMeet } from "../controllers/meet/controller";
import { deleteMeetValidator, getMeetByDevGroupValidator, MeatDetailsByIdValidator, newMeetValidator, updateMeetBodyValidator, updateMeetParamsValidator } from "../controllers/meet/validator";
import paramsValidation from "../middlewares/params-validation";
import bodyValidation from "../middlewares/body-validation";

const meetRouter = Router()

meetRouter.get('/devGroup/:devGroupId',paramsValidation(getMeetByDevGroupValidator),getMeetByDevGroup)
meetRouter.get('/:id',paramsValidation(MeatDetailsByIdValidator),getMeatDetailsById)
meetRouter.post('/new',bodyValidation(newMeetValidator),newMeet)
meetRouter.patch('/update/:id',paramsValidation(updateMeetParamsValidator),bodyValidation(updateMeetBodyValidator),updateMeet)
meetRouter.delete('/delete/:id',paramsValidation(deleteMeetValidator),deleteMeet)

export default meetRouter