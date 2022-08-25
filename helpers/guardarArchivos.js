const fs = require('fs');

const archivos = './db/data.json';


const guardarDB = (data) => {
    fs.writeFileSync(archivos, JSON.stringify(data));
}


const leerDB = () => {
    if(!fs.existsSync(archivos)){
        return null;
    }

    const info = fs.readFileSync(archivos, {encoding: 'utf-8'});

    const data = JSON.parse(info)
    
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}

