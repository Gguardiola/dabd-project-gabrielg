import { PrismaClient } from '@prisma/client'

export default async function list_tareas(req, res){
    //protección
    
    if(req.headers.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
   
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.headers.auth))
    let body = "none"

    try{
        body = await prisma.tarea.findMany({
            orderBy: { id_tarea: 'asc' },
          })
     
        await prisma.$disconnect
    }catch (error){
        await prisma.$disconnect
        return res.status(500).json({status: "error", body: "Error inesperado: "+error.message})

    }
    body = JSON.stringify(
        body,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
      )
    return res.status(200).json({body});
}



