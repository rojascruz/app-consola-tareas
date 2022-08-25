
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivos');
const { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');




const main = async() => {

 let opt = '';
 const tareas = new Tareas();

 const tareasDB = leerDB();

 if(tareasDB){ // Cargar tarea
    // SI existe establece tarea
    tareas.cargarTareasFromArray(tareasDB);
 }

//  await pausa();

do {
    // Imprime el menu y recupera la opcion 
    opt = await inquirerMenu();   
    
    switch (opt) {
        case '1':
            // Llama una funcion de inquirer donde tendra una condicion
            // Si tiene un mensaje recuperara el valor, si no se quedara ahi
            const desc = await leerInput('Descripcion:');

            // Ingresa el valor (desc) y lo pondra en crearTarea
            tareas.crearTarea(desc);
        break;
        case '2':

            // Mostrara todos los valores que ingresaste.
            tareas.listadoCompleto();
            // console.log(tareas.getListadoArr);
        break;
        case '3':
            // Listar Completadas
            tareas.listarPendientesCompletado(true)
        break;
        case '4':
            // Listada Pendiente
            tareas.listarPendientesCompletado(false)
        break
        case '5':
            // Completado | pendiente
            const ids = await mostrarListadoChecklist(tareas.getListadoArr);
            tareas.toggleCompletadas(ids);
        break;
        case '6':
            // Borrar
           const id = await listadoTareasBorrar(tareas.getListadoArr);
           if(id !== '0'){
               const ok = await confirmar('Estas seguro?')
               // TODO: Preguntar si esta seguro de borrar
               console.log({ok});
              
               if (ok) {
                    tareas.borrarTarea(id);
                    console.log('Tarea borrada');
                }
           }
        break;
    
    }

    guardarDB(tareas.getListadoArr);

    await pausa();
    
} while(opt != '0')
}


main();