import Head from 'next/head'
import apiEndpoint from '../../api'
import { useEffect, useState } from 'react'
import { Card, Table } from 'flowbite-react'
import TableFooter from './TableFooter'
import useTable from '../hooks/useTable'

export default function Naves(){
    const [test, setTest] = useState('')
    //paginación
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [refresh, setRefresh] = useState(true)
    //formulario nueva nave
    const [newNombre, setNombre] = useState("")
    const [newColor, setColor] = useState("")
    const [newModelo, setModelo] = useState("")

    //get naves
    useEffect(() =>{
        async function fetchData(params){

        try{
            const response = await apiEndpoint.get('/list_naves',
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

    async function addNave(data) {
        return await apiEndpoint.post("/add_nave", {
            auth: "yes",
            nombre: data.nombre,
            color: data.color,
            modelo: data.modelo

        }).then(function (response) {
            console.log(response)
            alert(response.data.body);
            setNombre("")
            setColor("")
            setModelo("")
            setRefresh(!refresh)
        }).catch(error => {
            console.log(error)
            alert(error.response.data.body);
            return error.response;
        });
    }
    async function delNave(item) {
        return await apiEndpoint.post("/del_nave", {
            auth: "yes",
            nombre: item  
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
        await addNave({
            nombre: newNombre,
            color: newColor,
            modelo: newModelo

        })

    }
    const handleDeleteButton = async (e) => {
        const result = window.confirm('¿Deseas confirmar la eliminación de la nave '+e+' ?');
        if (result) {
          await delNave(e)
        }
    }

    const newNombreHandler = (e) => {
        console.log(e.target.value)
        setNombre(e.target.value)
    }
    const newColorHandler = (e) => {
        console.log(e.target.value)
        setColor(e.target.value)
    }
    const newModeloHandler = (e) => {
        console.log(e.target.value)
        setModelo(e.target.value)
    }
    return(
        <>
        <div className='grid grid-cols-3 gap-4'>
            <Card className='drop-shadow-md	h-full'>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">Agregar nueva nave</p>

                <form onSubmit={handleSubmit}>
                    <div class="mb-6">
                        <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                        <input type="text" value={newNombre} onChange={newNombreHandler} id="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Nostromo" required></input>
                    </div>
                    <div class="mb-6">
                        <label for="color" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                        <input type="text" value={newColor} onChange={newColorHandler} id="color" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Marrón" required></input>
                    </div>
                    <div class="mb-6">
                        <label for="modelo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modelo</label>
                        <input type="text" value={newModelo} onChange={newModeloHandler} id="modelo" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='Nebula' required></input>
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
                                    Nombre
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Modelo
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
                                    {result.nombre}
                                </th>
                                <td class="px-6 py-4">
                                    {result.color}
                                </td>
                                <td class="px-6 py-4">
                                    {result.modelo}
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <a onClick={() => handleDeleteButton(result.nombre)} class="font-medium text-red-600 dark:text-red-500 cursor-pointer">Borrar</a>
                                </td>
                            </tr>
                            )) 
                            : (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                                </th>
                                <td class="px-6 py-4">
                                <div role="status">
                                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                        <span class="sr-only">Cargando...</span>
                                    </div>  
                                </td>
                                <td class="px-6 py-4">

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
        </div>

        </>
    )

}