import { PrismaClient } from '@prisma/client'

export default async function list_viajes(req, res){
    //protección
    if(req.headers.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.headers.auth))
    let body = "none"
    try{
        
        //body = await prisma.viajetripulante.findMany()
        //join
        body = await prisma.$queryRaw`select a.id_viaje,a.nombre,a.id,b.nombre as nombre_persona, a.fecha_abordaje,a.ingeniero
        from viajetripulante as a join persona as b on b.id = a.id order by a.id_viaje asc;`

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



