const express = require ("express");
const _ = require ("lodash"); //como en la documentacion de la libreria lodash la allmacenan en una constante "_" lo hago igual aunque podria ponerle otro nombre si quisiera 
const cursos = require ('./data/cursos.json');
const app = express();
const PORT = 3001;

app.use(express.json()); // es para que la info que se envia en el body de los request sea en formato json por defecto

//respuestas a consultas con GET 
app.get("/cursos", (req,res) => {

    res.status(200).json(cursos);
});

app.get("/cursos/:cursoId", (req,res) => {

    const idCurso = req.params.cursoId;
    const curso = cursos.find(c => c.id == idCurso);
    if (curso) {
        res.status(200).json(curso);
    } else {
        res.status(404).json({
            message: `El curso solicitado con id: ${idCurso} no existe`
        })
    }  
});

//respuestas a crear o dar de alta con POST
app.post('/cursos' , (req,res) => {
    const datosCurso = req.body;
    const arrayIds= cursos.map (c => c.id);
    //calculo el valor que tomara el id del curso que estoy creando 
    const idMax = _.max(arrayIds) + 1;
    const curso = { id: idMax, ...datosCurso, habilitado: true };
    //agrego al array el objeto creado
    cursos.push(curso);
    //configuro como va a responder, me va a devolver el json con el objeto que cree
    res.status(201).json(curso);
    
})

//respuestas a borrar con verbo DELETE

app.delete('/cursos/:cursoId' , (req,res) => {
    const idCurso = req.params.cursoId;
    const indiceCurso = cursos.findIndex(c => c.id == idCurso);
    if (indiceCurso >= 0) {
        cursos.splice(indiceCurso, 1)
        res.status(200).json({
            message: `El curso solicitado con id: ${idCurso} fue eliminado correctamente`
        });
    } else {
        res.status(404).json({
            message: `El curso solicitado con id: ${idCurso} no existe`
        })

    }
})

app.listen(PORT, () => {
    console.log(`La aplicación inició en el puerto ${PORT}`);
});