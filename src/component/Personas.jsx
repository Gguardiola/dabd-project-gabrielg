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
    //formulario nueva persona
    const [newNombre, setNombre] = useState("")
    const [newNacimiento, setNacimiento] = useState("")
    const [newSearchValue, setSearchValue] = useState("")

    //get personas
    useEffect(() =>{
        async function fetchData(params){

        try{
            const response = await apiEndpoint.get('/list_personas',
                {
                    headers:{
                        Auth: "yes",
                        page: params.numPage,
                        rowsPerPage: params.totalElem
                    }
                }
            );
            console.log(response.data.body) 
            setTest(response.data.body)
            
        }catch(error){
            console.log("ERROR!. "+ error)
        }
        }
        fetchData({page,rowsPerPage});
    }, [refresh]);

    async function addPersona(data) {
        return await apiEndpoint.post("/add_persona", {
            auth: "yes",
            nombre: data.nombre,
            fecha_nacimiento: data.fecha_nacimiento,

        }).then(function (response) {
            console.log(response)
            alert(response.data.body);
            setNombre("")
            setNacimiento("")
            setRefresh(!refresh)
        }).catch(error => {
            console.log(error)
            alert(error.response.data.body);
            return error.response;
        });
    }
    async function delPersona(item) {
        return await apiEndpoint.post("/del_persona", {
            auth: "yes",
            id: item  
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
    async function updatePersona(id, newNombrePersona) {
        return await apiEndpoint.post("/update_persona", {
            auth: "yes",
            id_persona: id,
            nombre: newNombrePersona  
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
    var { slice, range } = useTable(test, page, rowsPerPage);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!dataFormato.test(newNacimiento)) {
            // La fecha no cumple con el formato deseado (YYYY-MM-DD)
            alert("Formato de fecha no válido!! Debe ser: YYYY-MM-DD.");
            return;
        }
        else{
            await addPersona({
                nombre: newNombre,
                fecha_nacimiento: newNacimiento,

            })
        }
    }
    const handleDeleteButton = async (e) => {
        const result = window.confirm('¿Deseas confirmar la eliminación de la persona '+e.nombre+' ?');
        if (result) {
          await delPersona(e.id)
        }
    }

    const newNombreHandler = (e) => {
        console.log(e.target.value)
        setNombre(e.target.value)
    }
    const newNacimientoHandler = (e) => {
        console.log(e.target.value)
        setNacimiento(e.target.value)
    }
    const handleUpdateButton = async (e) => {
        let newNombrePersona = []
        let result = "none"
        result = window.confirm('¿Deseas cambiar el nombre '+e.nombre+' ?');   
        if (result) {
            newNombrePersona = prompt("Introduce el nombre:")
            console.log(newNombrePersona)
            if (newNombrePersona != null){
                console.log(e)
                await updatePersona(e.id,newNombrePersona)
            }
        }
    }
 
    const searchValueHandler = (e) => {
        e.preventDefault()
        if (test){
            if(e.target.value.length > 0){
                
                setSearchValue(e.target.value)
                const newFiltrado = test.filter((item) =>
                    item.nombre.toLowerCase().includes(newSearchValue.toLowerCase())
                );
                setTest(newFiltrado)
            }
            else setRefresh(!refresh)
        }
    }

      
    var { slice, range } = useTable(test, page, rowsPerPage);

    return(
        <>
        <div className='grid grid-cols-3 gap-4'>
            <Card className='drop-shadow-md	h-full'>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">Agregar persona</p>

                <form onSubmit={handleSubmit}>
                    <div class="mb-6">
                        <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre y apellidos</label>
                        <input type="text" value={newNombre} onChange={newNombreHandler} id="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ibai Llanos" required></input>
                    </div>
                    <div class="mb-6">
                        <label for="nacimiento" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de nacimiento</label>
                        <input type="text" value={newNacimiento} onChange={newNacimientoHandler} id="nacimiento" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="2000-01-31" required></input>
                    </div>
                    <div class="flex items-start mb-6">
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar</button>
                </form>




            </Card>
                <div className='col-span-2 grid grid-cols-2 gap-4'>
                    <form className='w-full col-span-2'>   
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search"  onChange={searchValueHandler} id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Alex Pascual..." required></input>
                        </div>
                    </form>

                    <div class="w-full col-span-2 overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Nombre
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Fecha de nacimiento
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Editar</span>
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
                                        {result.id}
                                    </th>
                                    <td class="px-6 py-4">
                                        {result.nombre}
                                    </td>
                                    <td class="px-6 py-4">
                                        {new Date(result.fecha_nacimiento).toLocaleDateString()}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <a onClick={() => handleUpdateButton({id: result.id, nombre: result.nombre})} class="font-medium text-red-600 dark:text-blue-500 cursor-pointer">Cambiar nombre</a>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <a onClick={() => handleDeleteButton({id: result.id, nombre: result.nombre})} class="font-medium text-red-600 dark:text-red-500 cursor-pointer">Borrar</a>
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
                </div>
                <div></div>
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </div>
        
        
        </>
    )

}