import Head from 'next/head'
import apiEndpoint from '../../api'
import { useEffect, useState } from 'react'
import { Card, Table } from 'flowbite-react'
import TableFooter from './TableFooter'
import useTable from '../hooks/useTable'


export default function Viajes(){
    const dataFormato = /^\d{4}-\d{2}-\d{2}$/;
    const [test, setTest] = useState('')
    const [naves, setNaves] = useState('')
    const [empresas, setEmpresas] = useState("")
    //paginación
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [refresh, setRefresh] = useState(true)
    //formulario nueva viaje
    const [newNave, setNave] = useState("")
    const [newAbordaje, setAbordaje] = useState("")
    const [newPersona, setPersona] = useState("")
    const [isIngeniero, setIsIngeniero] = useState(true)
    const [newEmpresa, setEmpresa] = useState("")
    const [newSearchValue, setSearchValue] = useState("")

    //get viajes
    useEffect(() =>{
        async function fetchData(params){

        try{
            const response = await apiEndpoint.get('/list_viajes',
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
        async function fetchNaves(){

            try{
                const response = await apiEndpoint.get('/list_naves',
                    {
                        headers:{
                            Auth: "yes",

                        }
                    }
                );
                setNaves(response.data.body)
                
            }catch(error){
                console.log("ERROR!. "+ error)
            }
        }
        async function fetchEmpresas(){

            try{
                const response = await apiEndpoint.get('/list_empresas',
                    {
                        headers:{
                            Auth: "yes",

                        }
                    }
                );
                setEmpresas(JSON.parse(response.data.body))
                
            }catch(error){
                console.log("ERROR!. "+ error)
            }
        }
        fetchData({page,rowsPerPage});
        fetchNaves();
        fetchEmpresas();
    }, [refresh]);

    async function addViaje(data) {
        return await apiEndpoint.post("/add_viaje", {
            auth: "yes",
            nombre: data.nombre,
            id: data.id,
            fecha_abordaje: data.fecha_abordaje,
            ingeniero: data.ingeniero,
            empresa: data.empresa

        }).then(function (response) {
            console.log(response)
            alert(response.data.body);
            setNave("")
            setAbordaje("")
            setPersona("")
            setEmpresa("")
            setRefresh(!refresh)
        }).catch(error => {
            console.log(error)
            alert(error.response.data.body);
            return error.response;
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!dataFormato.test(newAbordaje)) {
            // La fecha no cumple con el formato deseado (YYYY-MM-DD)
            alert("Formato de fecha no válido!! Debe ser: YYYY-MM-DD.");
            return;
        }
        else{
            await addViaje({
                nombre: newNave,
                id: newPersona,
                fecha_abordaje: newAbordaje,
                ingeniero: isIngeniero,
                empresa: newEmpresa
            })
        }
    }

    const newAbordajeHandler = (e) => {
        console.log(e.target.value)
        setAbordaje(e.target.value)
    }
    const newPersonaHandler = (e) => {
        console.log(e.target.value)
        setPersona(e.target.value)
    }
    const searchValueHandler = (e) => {
        e.preventDefault()
        if (test){
            if(e.target.value.length > 0){
            setSearchValue(e.target.value)
            const newFiltrado = test.filter((item) =>
                item.id_viaje.toLowerCase().includes(newSearchValue.toLowerCase())
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
                <p class="text-3xl font-bold text-gray-900 dark:text-white">Nuevo viaje</p>

                <form onSubmit={handleSubmit}>
                    <div class="mb-6">
                        <label for="nave" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nave</label>
                        <select id="nave" onChange={(event) => setNave(event.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option selected disabled>Selecciona una nave</option>
                        { naves ?
                            naves.map((result) => 
                                <option value={result.nombre}>{result.nombre}</option>

                            ) :
                            (
                                <>
                                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                <span class="sr-only">Cargando...</span>     
                                </>
                            )
                        }
                        </select>
                    </div>
                    <div class="mb-6">
                        <label for="abordaje" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de abordaje</label>
                        <input type="text" value={newAbordaje} onChange={newAbordajeHandler} id="abordaje" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="2000-01-31" required></input>
                    </div>
                    <div class="mb-6">
                        <label for="id_persona" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID de la persona</label>
                        <input type="number" value={newPersona} onChange={newPersonaHandler} id="abordaje" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="1233" required></input>
                    </div>


                    <div class="flex items-center mb-4">
                        <input defaultChecked checked={isIngeniero} onChange={() => setIsIngeniero(true)} id="ingeniero" type="radio" value="" name="ingeniero" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="ingeniero" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ingeniero</label>
                    </div>
                    <div class="flex items-center mb-6">
                        <input id="supervisor" checked={!isIngeniero} onChange={() => setIsIngeniero(false)}  type="radio" value="" name="supervisor" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="supervisor" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Supervisor</label>
                    </div>
                   { !isIngeniero && <> <div class="mb-6">
                        <label for="nave" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Empresa</label>
                        <select id="nave" onChange={(event) => setEmpresa(event.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected disabled>Selecciona la empresa</option>
                        { empresas ?
                            empresas.map((result) => 
                                <option value={result.nombre}>{result.nombre}</option>

                            ) :
                            (
                                <>
                                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                <span class="sr-only">Cargando...</span>     
                                </>
                            )
                        }
                        </select>
                    </div></>}
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear tarjeta de tripulante</button>
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
                            <input type="search"  onChange={searchValueHandler} id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="301231..." required></input>
                            
                        </div>
                    </form>
                    <div class="w-full col-span-2 overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        ID del viaje
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Nave
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        ID persona
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Nombre
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Fecha de abordaje
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Rol
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="">
                            { test ? (
                                slice.map((result) => 
                                
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {result.id_viaje}
                                    </th>
                                    <td class="px-6 py-4">
                                        {result.nombre}
                                    </td>
                                    <td class="px-6 py-4">
                                        {result.id}
                                    </td>
                                    <td class="px-6 py-4">
                                        {result.nombre_persona}
                                    </td>
                                    <td class="px-6 py-4">
                                        {new Date(result.fecha_abordaje).toLocaleDateString()}
                                    </td>
                                    {/* SI ES INGENIERO, MOSTRAR TAG */}
                                    <td class="px-6 py-4 text-right">
                                        {result.ingeniero == true ? <p class="font-bold text-blue-600">Ingeniero</p>: <p class="font-bold text-red-600">Supervisor</p>}
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