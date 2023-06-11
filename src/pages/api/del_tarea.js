import { PrismaClient } from '@prisma/client'

export default async function add_tarea(req, res){
    //protección
    if(req.body.auth != "yes"){
         return res.status(403).json({"error" : "acceso denegado"})

    }
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.body))
    let body = "none"
    try{
        await prisma.$queryRaw`delete from informetarea where id_tarea = ${parseInt(req.body.id_tarea)};`       
        await prisma.tarea.delete({
            where: {
                id_tarea: parseInt(req.body.id_tarea)
            }

        })
        await prisma.$disconnect
    }catch (error){
        await prisma.$disconnect
        return res.status(500).json({status: "error", body: "Error inesperado: "+error.message})

    }
    return res.status(200).json({status: "ok",body: "Tarea eliminada correctamente!"});
}



