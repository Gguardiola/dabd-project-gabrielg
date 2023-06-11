import { PrismaClient } from '@prisma/client'

export default async function list_ingenieroTarea(req, res){
    //protección
    
    if(req.body.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
   
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.headers.auth))
    let body = "none"

    try{
        body = await prisma.$queryRaw`
        select a.id_tarea, a.veredicto, b.desc_tarea, b.sector_nave 
        from (select * from informetarea where id_viaje = ${parseInt(req.body.id_viaje_i)}) as a join tarea as b on a.id_tarea = b.id_tarea; 
        `
     
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



