import { Request,Response,NextFunction } from "express";
import { DevGroup } from "../../models/DevGroup";

export async function getAllDevGroup(request:Request,response:Response,next:NextFunction){
    try{

        const DevGroups = await DevGroup.findAll()
        response.json(DevGroups)

    }catch(e){
        next(e)
    }
}