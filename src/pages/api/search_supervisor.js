import { PrismaClient } from '@prisma/client'

export default async function search_supervisor(req, res){
    //protección
    if(req.body.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
   
    const prisma = new PrismaClient()
    let body = "none"

    try{
        body = await prisma.supervisor.findFirst({
            where:{
                id_viaje: parseInt(req.body.id)
            }
        })
        body = JSON.stringify(
            body,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
          )
        if(body == "null") throw error;
        await prisma.$disconnect
    }catch (error){
        await prisma.$disconnect
        if(body == "null") return res.status(500).json({status:"error",body:"El supervisor no existe!"})
        
        return res.status(500).json({status: "error", body: "Error inesperado: "+error.message})

    }

    return res.status(200).json({body});
}



