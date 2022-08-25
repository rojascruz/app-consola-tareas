const Tarea = require('./tarea')

class Tareas {

    _listado = {}

    constructor() {
        this._listado = {};
    }

    get getListadoArr(){
        const listado = [];

        // Te trae un arreglo de todas las llaves
        // !forEach realiza TODAS las llaves del arreglo

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]; 
            listado.push(tarea)   
        });

        return listado;
    }

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []){
        
        tareas.forEach(tarea => {

            this._listado[tarea.id] = tarea;
            
        });
    }

    listadoCompleto(){
        this.getListadoArr.forEach((tarea, i) => {
           
            console.log();
            const idx = `${i+1}`.green;
            const {desc, completadoEn} = tarea

            const estado = (completadoEn) 
                                ? 'Completado'.green
                                : 'Pendiente'.red;

            console.log(`${idx}. ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletado(completadas = true){
        let contador = 0;
        console.log();
        this.getListadoArr.forEach((tarea) => {
           
            
            const {desc, completadoEn} = tarea

            const estado = (completadoEn) 
                                ? 'Completado'.green
                                : 'Pendiente'.red;

            if(completadas){
                // Mostrar completadas
                if(completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                // Mostrar pendientes
                if(!completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').red} ${desc} :: ${estado}`);
                }
            }
        });
    }


    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }


    toggleCompletadas (ids = []) {
        
        ids.forEach(id => {
            
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.getListadoArr.forEach(tarea => {

            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas