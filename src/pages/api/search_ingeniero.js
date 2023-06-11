import { PrismaClient } from '@prisma/client'

export default async function search_ingeniero(req, res){
    //protección
    if(req.body.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
   
    const prisma = new PrismaClient()
    let body = "none"

    try{
        body = await prisma.viajetripulante.findFirst({
            where:{
                id_viaje: parseInt(req.body.id)
            },select:{
                ingeniero: true

            }
        })
        console.log(body.ingeniero)     
        if(body == null || body == undefined) throw error;

        else if(body.ingeniero == false ){
            return res.status(500).json({status: "error", body: "Error! No se encuentra el ingeniero!"})
        }
        await prisma.$disconnect
    }catch (error){
        await prisma.$disconnect
        if(body == null) return res.status(500).json({status:"error",body:"El ingeniero no existe!"})
        
        return res.status(500).json({status: "error", body: "Error inesperado: "+error.message})

    }

    return res.status(200).json({body});
}



