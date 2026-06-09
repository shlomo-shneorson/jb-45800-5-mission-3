import {Request,Response, NextFunction } from "express"
import { Meet } from "../../models/Meet"
import { DevGroup } from "../../models/DevGroup"

export async function getMeetByDevGroup(request:Request<{devGroupId:string},{},{}>,response:Response,next:NextFunction){
    try{
        
        const {devGroupId} = request.params
        const meets = await Meet.findAll({
            include:[DevGroup],
            where :{
              devGroupId
            }
        })
        response.json(meets)

    }catch(e){
        next(e)
    }
}

export async function getMeatDetailsById(request:Request<{id:string},{},{}>,response:Response,next:NextFunction){
    
    try{

        const {id} = request.params

        const meatDetails = await Meet.findByPk(id,{
            include:[DevGroup]
        })

        response.json(meatDetails)

    }catch(e){
        next(e)
    }

}

export async function newMeet(request:Request<{},{},
{    
    devGroupId:string ,
    startTime:Date,
    finishTime:Date,
    description:string,
    room:string
}
>,response:Response,next:NextFunction){

    try{

        const {body} = request

        const newMeetDetails = await Meet.create({...body})

        response.json(newMeetDetails)

    }catch(e){

        next(e)

    }

}


export async function updateMeet(request:Request<{id:string},{},
{   id:string
    devGroupId:string ,
    startTime:Date,
    finishTime:Date,
    description:string,
    room:string
}
>,response:Response,next:NextFunction){

    try{

        const {id} = request.params
        const {body} = request

        const [countResponse] = await Meet.update({
            ...body
        },{
            where:{id}
        })
        if(countResponse === 0)return next({status:422,message:'you tried update un-exists meet...'})
        
        const updatedMeet = await Meet.findByPk(id,{include: [DevGroup]}) 

        response.json(updatedMeet)

    }catch(e){

        next(e)

    }

}

export async function deleteMeet(request:Request<{id:string},{},{}>,response:Response,next:NextFunction) {

    try{

        const {id} = request.params

        const rowsOfDeleted = await Meet.destroy({
            where:{id}
        })

        if(rowsOfDeleted === 0) return next({status:422,message:'you tried delete un-exits meet...'})
        
        response.json('success : true')

    }catch(e){
        next(e)
    }
    
}