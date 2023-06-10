import Head from 'next/head'
import apiEndpoint from '../../api'
import { useEffect, useState } from 'react'
import { Card, Table } from 'flowbite-react'
import TableFooter from './TableFooter'
import useTable from '../hooks/useTable'


export default function Personas(){
    const dataFormato = /^\d{4}-\d{2}-\d{2}$/;
    const [test, setTest] = useState('')
    //paginación
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [refresh, setRefresh] = useState(true)

    const [newIngeniero, setIngeniero] = useState("")
    const [newSupervisor, setSupervisor] = useState("")
    const [targetSupervisor, setTargetSupervisor] = useState(newSupervisor)
    const [isMenuActive, setActiveMenu] = useState(false)
    //get personas
    useEffect(() =>{
        async function fetchData(newSupervisor){
        console.log("fetch "+newSupervisor)
        try{
            const response = await apiEndpoint.post('/list_supervisa',
                {
                    auth: "yes",
                    id_viaje_s: newSupervisor,
                }
            );
            console.log(response.data.body)
            setTest(JSON.parse(response.data.body))
            
        }catch(error){
            console.log("ERROR!. "+ error)
        }
        }
        if(newSupervisor.length > 0){

            fetchData(newSupervisor);
        }
    }, [refresh]);

    async function addIngeniero(data) {
        return await apiEndpoint.post("/add_ingeniero", {
            auth: "yes",
            id_viaje_i: data.id_viaje,
            id_viaje_s: newSupervisor

        }).then(function (response) {
            console.log(response)
            alert(response.data.body);
            setIngeniero("")
            setRefresh(!refresh)
        }).catch(error => {
            console.log(error)
            alert(error.response.data.body);
            return error.response;
        });
    }
    async function delIngeniero(item) {
        return await apiEndpoint.post("/del_ingeniero", {
            auth: "yes",
            id_viaje_i: item,
            id_viaje_s: newSupervisor
        }).then(function (response) {
            console.log(response)
            alert(response.data.body);
            setRefresh(!refresh)
        }).catch(error => {
            console.log(error)
            alert(error.response.data.body);
            return error.response;
        });
    }
    async function searchSupervisor(item) {
        return await apiEndpoint.post("/search_supervisor", {
            auth: "yes",
            id: item  
        }).then(function (response) {
            console.log(response)
            setActiveMenu(true)
            setRefresh(!refresh)
        }).catch(error => {
            console.log(error)
            alert(error.response.data.body);
            return error.response;
        });
    }
    var { slice, range } = useTable(test, page, rowsPerPage);

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addIngeniero({
            id_viaje: newIngeniero

        })

    }
    const handleSubmitSupervisor = async (e) => {
        e.preventDefault()
        console.log(newSupervisor)
        await searchSupervisor(newSupervisor)
        setTargetSupervisor(newSupervisor)
    }
    const handleDeleteButton = async (e) => {
        const result = window.confirm('¿Deseas confirmar la eliminación de la supervisión sobre '+e.nombre+' ?');
        if (result) {
          await delIngeniero(e.id)
        }
    }

    const newIngenieroHandler = (e) => {
        console.log(e.target.value)
        setIngeniero(e.target.value)
    }



    return(
        <>
        
        <div className='grid grid-cols-3 gap-4'>
        <Card className='drop-shadow-md col-span-3 w-full h-full'>
                <p class="text-3xl  font-bold text-gray-900 dark:text-white">Selecciona un supervisor</p>

                <form onSubmit={handleSubmitSupervisor}>
                    <div class="mb-6">
                        <label for="nombre" class= " block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID supervisor</label>
                        <input type="number" value={newSupervisor} onChange={(e) => setSupervisor(e.target.value)} id="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="103" required></input>
                    </div>
                    <div class="flex items-start mb-6">
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
                </form>
            </Card>
            { isMenuActive && <>
            <div className='h-full m-3 col-span-3'><h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Supervisiones de {targetSupervisor}</h1></div>
            <Card className='drop-shadow-md	h-full'>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">Nueva supervisión</p>

                <form onSubmit={handleSubmit}>
                    <div class="mb-6">
                        <label for="nacimiento" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID ingeniero</label>
                        <input type="number" value={newIngeniero} onChange={newIngenieroHandler} id="nacimiento" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="50123" required></input>
                    </div>
                    <div class="flex items-start mb-6">
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar</button>
                </form>
            </Card>
            
                <div class="w-full col-span-2 overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Nº tareas
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    ID del viaje
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Nave
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Editar</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                        { test ? (
                            slice.map((result) => 
                            
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {result.tareas}
                                </th>
                                <td class="px-6 py-4">
                                    {result.id_viaje}
                                </td>
                                <td class="px-6 py-4">
                                    {result.nombre}
                                </td>
                                <td class="px-6 py-4">
                                    {result.nave}
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <a onClick={() => handleDeleteButton({id: result.id_viaje, nombre: result.nombre})} class="font-medium text-red-600 dark:text-red-500 cursor-pointer">Borrar</a>
                                </td>
                            </tr>
                            )) 
                            : (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                                </th>
                                <td class="px-6 py-4">

                                </td>
                                <td class="px-6 py-4">
                                    <div role="status">
                                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                        <span class="sr-only">Cargando...</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-right">
                                
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                    
                </div>
                <div></div>
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
            </> }
        </div>
        
        
        </>
    )

}