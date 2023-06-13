import Head from 'next/head'
import apiEndpoint from '../../api'
import { useEffect, useState } from 'react'
import { Card } from 'flowbite-react'
import TableFooter from './TableFooter'
import useTable from '../hooks/useTable'


export default function Tareas(){
    const dataFormato = /^\d{4}-\d{2}-\d{2}$/;
    const [test, setTest] = useState('')

    //paginación
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [refresh, setRefresh] = useState(true)
    //formulario nueva tarea
    const [newDesc, setDesc] = useState("")
    const [newFechaInicio, SetFechaInicio] = useState("")
    const [newSector, setSector] = useState("")
    const [newIngenieroTarea, setIngenieroTarea] = useState("")
    const [newSearchValue, setSearchValue] = useState("")

    //get viajes
    useEffect(() =>{
        async function fetchData(params){

        try{
            const response = await apiEndpoint.get('/list_tareas',
                {
                    headers:{
                        Auth: "yes",
                        page: params.numPage,
                        rowsPerPage: params.totalElem
                    }
                }
            );
            setTest(JSON.parse(response.data.body))
            
        }catch(error){
            console.log("ERROR!. "+ error)
        }
        }

        fetchData({page,rowsPerPage});
    }, [refresh]);

    async function addTarea(data) {
        return await apiEndpoint.post("/add_tarea", {
            auth: "yes",
            descripcion: data.descripcion,
            sector: data.sector,
            fecha_inicio: data.fecha_inicio,
            ingeniero: data.idIngeniero,

        }).then(function (response) {
            console.log(response)
            alert(response.data.body);
            setDesc("")
            SetFechaInicio("")
            setSector("")
            setIngenieroTarea("")
            setRefresh(!refresh)
        }).catch(error => {
            console.log(error)
            alert(error.response.data.body);
            return error.response;
        });
    }
    async function delTarea(newid_tarea) {
        return await apiEndpoint.post("/del_tarea", {
            auth: "yes",
            id_tarea: newid_tarea

        }).then(function (response) {
            console.log(response)
            alert(response.data.body);
            setDesc("")
            SetFechaInicio("")
            setSector("")
            setIngenieroTarea("")
            setRefresh(!refresh)
        }).catch(error => {
            console.log(error)
            alert(error.response.data.body);
            return error.response;
        });
    }

    async function add_ingenieroTarea(id_tarea_current,idIngeniero) {
        return await apiEndpoint.post("/add_ingenieroTarea", {
            auth: "yes",
            ingeniero: idIngeniero,
            id_tarea: id_tarea_current,

        }).then(function (response) {
            console.log(response)
            alert(response.data.body);
            setDesc("")
            SetFechaInicio("")
            setSector("")
            setIngenieroTarea("")
            setRefresh(!refresh)
        }).catch(error => {
            console.log(error)
            alert(error.response.data.body);
            return error.response;
        });
    }    


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!dataFormato.test(newFechaInicio)) {
            // La fecha no cumple con el formato deseado (YYYY-MM-DD)
            alert("Formato de fecha no válido!! Debe ser: YYYY-MM-DD.");
            return;
        }
        else{
            await addTarea({
                descripcion: newDesc,
                sector: newSector,
                fecha_inicio: newFechaInicio,
                idIngeniero: newIngenieroTarea
            })
        }
    }
    const handleDeleteButton = async (e) => {
        const result = window.confirm('¿Deseas confirmar la eliminación de la tarea '+e.desc_tarea+' ?');
        if (result) {
          await delTarea(e.id_tarea)
        }
    }
    const newFechaInicioHandler = (e) => {
        console.log(e.target.value)
        SetFechaInicio(e.target.value)
    }
    const newSectorHandler = (e) => {
        console.log(e.target.value)
        setSector(e.target.value)
    }
    const newDescHandler = (e) => {
        console.log(e.target.value)
        setDesc(e.target.value)
    }
    const newIngenieroTareaHandler = (e) => {
        console.log(e.target.value)
        setIngenieroTarea(e.target.value)
    }
    const handleAgregarButton = async (e) => {

        let plusIngeniero = ""
        let result = "none"
        result = window.confirm('¿Deseas agregar al ingeniero '+plusIngeniero+' a la tarea "'+e.desc_tarea+'"?');   
        if (result) {
            plusIngeniero = prompt("Introduce el ID del ingeniero que quieres agregar a la tarea:")
            console.log(plusIngeniero)
            if (plusIngeniero != null){
                console.log(e)
                await add_ingenieroTarea(e.id,plusIngeniero)
            }
        }
    }

    const searchValueHandler = (e) => {
        e.preventDefault()
        
        if (test){
            if(e.target.value.length > 0){
                setSearchValue(e.target.value)
                const newFiltrado = test.filter((item) =>
                    item.desc_tarea.toLowerCase().includes(newSearchValue.toLowerCase())
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
                <p class="text-3xl font-bold text-gray-900 dark:text-white">Nueva tarea</p>

                <form onSubmit={handleSubmit}>
                    <div class="mb-6">
                        <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción de la tarea</label>
                        <input type="text" value={newDesc} onChange={newDescHandler} id="desc" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enfriar reactor" required></input>
                    </div>
                    <div class="mb-6">
                        <label for="fechaini" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de inicio</label>
                        <input type="text" value={newFechaInicio} onChange={newFechaInicioHandler} id="fechaini" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="2000-01-31" required></input>
                    </div>
                    <div class="mb-6">
                        <label for="sector" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sector nave</label>
                        <input type="text" value={newSector} onChange={newSectorHandler} id="sector" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Cocina" required></input>
                    </div>
                    {/* <div class="mb-6">
                        <label for="id_persona" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID ingeniero (después podrás agregar más)</label>
                        <input type="number" value={newIngenieroTarea} onChange={newIngenieroTareaHandler} id="abordaje" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="1233" required></input>
                    </div> */}

                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear tarea</button>
                </form>

            </Card>
                {console.log(test)}
                <div className='col-span-2 grid grid-cols-2 gap-4'>
                    <form className='w-full col-span-2'>   
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search"  onChange={searchValueHandler} id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enfriar reactor..." required></input>
                            
                        </div>
                    </form>
                    <div class="w-full col-span-2 overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        ID tarea
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Descripción
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Inicio
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Finalización
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Sector
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
                                        {result.id_tarea}
                                    </th>
                                    <td class="px-6 py-4">
                                        {result.desc_tarea}
                                    </td>
                                    <td class="px-6 py-4">
                                        {new Date(result.fecha_inicio).toLocaleDateString()}
                                    </td>
                                    <td class="px-6 py-4">
                                        {new Date(result.fecha_fin).toLocaleDateString() == "1/1/1970" ? <>En curso</> : new Date(result.fecha_fin).toLocaleDateString()}
                                    </td>
                                    <td class="px-6 py-4">
                                        {result.sector_nave}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <a onClick={() => handleAgregarButton({id: result.id_tarea, desc_tarea: result.desc_tarea})} class="font-medium text-red-600 dark:text-blue-500 cursor-pointer">Agregar ingeniero</a>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <a onClick={() => handleDeleteButton({id_tarea: result.id_tarea, desc_tarea: result.desc_tarea})} class="font-medium text-red-600 dark:text-red-500 cursor-pointer">Borrar</a>
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