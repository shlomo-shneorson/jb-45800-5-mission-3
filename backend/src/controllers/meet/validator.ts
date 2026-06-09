import Joi, { string } from "joi";

export const  getMeetByDevGroupValidator = Joi.object({
    devGroupId:Joi.string().required().uuid()
})


export const MeatDetailsByIdValidator = Joi.object({
    id:Joi.string().required().uuid()
})

export const newMeetValidator = Joi.object({
    devGroupId: Joi.string().required().uuid(),
    startTime:Joi.date().required(),
    finishTime:Joi.date().required(),
    description:Joi.string().required(),
    room:Joi.string().required(),
    
})

export const updateMeetBodyValidator = newMeetValidator

export const updateMeetParamsValidator = Joi.object({
    id:Joi.string().required().uuid()
})


export const deleteMeetValidator = updateMeetParamsValidator