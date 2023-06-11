import { PrismaClient } from '@prisma/client'

export default async function update_tarea(req, res){
    //protección
    if(req.body.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.body))

    try{

            await prisma.informetarea.update({
                where:{
                    id_viaje_id_tarea: {
                        id_viaje: parseInt(req.body.ingeniero),
                        id_tarea: parseInt(req.body.id_tarea)
                    }
                },
                data: {
                    veredicto: req.body.veredicto
                }
            })
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            
            const fechaHoy = `${year}-${month}-${day}`;

            await prisma.tarea.update({
                where:{
                    id_tarea: parseInt(req.body.id_tarea)
                },
                data: {
                    fecha_fin: fechaHoy+"T00:00:00.000Z"
                }
            })

        await prisma.$disconnect
    }catch (error){
        await prisma.$disconnect
        if(error.code == "P2002"){
            return res.status(500).json({status: "error", body: "Error! Esta tarea ya se encuentra en el registro!"})
        }
        else{
            console.log(JSON.stringify(error.message))
            return res.status(500).json({status: "error", body: "Error inesperado: "+error.message})
        }
    }
    return res.status(200).json({status: "ok",body: "Tarea completada correctamente!"});
}



