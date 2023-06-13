import { PrismaClient } from '@prisma/client'

export default async function add_ingenieroTarea(req, res){
    //protección
    if(req.body.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.body))
    let body = "none"
    try{
        //busca si el ingeniero es realmente ingeniero
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
        //control ingeniero vs supervisor tabla
        if(ingenieroInViajetripulante.length == 1 && ingenieroInViajetripulante[0].ingeniero == true ){
            //CONCEPTO ASOCIATIVO
            await prisma.informetarea.create({
                data: {
                    id_viaje: parseInt(req.body.ingeniero),
                    id_tarea: parseInt(req.body.id_tarea),
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
    return res.status(200).json({status: "ok",body: "Ingeniero agregado correctamente!"});
}



