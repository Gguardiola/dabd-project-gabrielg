import { PrismaClient } from '@prisma/client'

export default async function add_tarea(req, res){
    //protección
    if(req.body.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.body))
    let body = "none"
    const randomNumberInRange = Math.floor(Math.random() * (500000 - 500 + 1)) + 500
    try{

        const ingenieroInViajetripulante = await prisma.viajetripulante.findMany({
            where: {
                id_viaje: parseInt(req.body.ingeniero)
            },
            select: {
                ingeniero: true
                
            },
        })
        console.log(ingenieroInViajetripulante)
        console.log("ingeniero? "+ ingenieroInViajetripulante.length)
        if(ingenieroInViajetripulante.length == 1 && ingenieroInViajetripulante[0].ingeniero == true ){
            body = await prisma.tarea.create({
                data: {
                    id_tarea: randomNumberInRange,
                    desc_tarea: req.body.descripcion,
                    fecha_inicio: req.body.fecha_inicio+"T00:00:00.000Z",
                    fecha_fin:null,
                    sector_nave: req.body.sector
                }

            })
            await prisma.informetarea.create({
                data: {
                    id_viaje: parseInt(req.body.ingeniero),
                    id_tarea: randomNumberInRange,
                    veredicto: null
                }
            })


        }
        else{
            return res.status(500).json({status: "error", body: "Error! No se encuentra el ingeniero!"})
        }
        
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
    return res.status(200).json({status: "ok",body: "Tarea creada correctamente!"});
}



