import { PrismaClient } from '@prisma/client'

export default async function list_supervisa(req, res){
    //protección
    if(req.body.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
    const prisma = new PrismaClient()
    console.log("TEST APICALL asd: "+JSON.stringify(req.body))
    let body = "none"
    try{
        
        body = await prisma.$queryRaw`
            select distinct count(it.id_tarea) as tareas, trip.id_viaje as ID_viaje, p.nombre as Nombre, n.nombre as Nave
            from viajeTripulante as trip 
            join persona as p on trip.id = p.id join supervisa as super on super.id_viaje_i = trip.id_viaje and super.id_viaje_s = ${parseInt(req.body.id_viaje_s)}
            join nave as n on n.nombre = trip.nombre 
            join informeTarea as it on it.id_viaje = trip.id_viaje where it.veredicto is not null 
            group by trip.id_viaje, p.nombre, n.nombre, super.id_viaje_i order by tareas DESC;        
        
        `
        //body = await prisma.$queryRaw`select a.id_viaje,a.nombre,a.id,b.nombre as nombre_persona, a.fecha_abordaje,a.ingeniero from viajetripulante as a join persona as b on b.id = a.id;`

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



