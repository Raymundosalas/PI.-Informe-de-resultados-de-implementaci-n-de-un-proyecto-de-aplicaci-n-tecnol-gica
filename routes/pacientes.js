const express = require("express");
const router = express.Router();

const db = require("../database");

const auth = require("../middleware/auth");


// OBTENER
router.get("/",auth,(req,res)=>{

    db.query(
        "SELECT * FROM pacientes",
        (err,rows)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json(rows);

        }
    );

});


// CREAR
router.post("/",auth,(req,res)=>{

    const {
        nombre,
        telefono,
        correo
    } = req.body;

    if(
        !nombre ||
        !telefono ||
        !correo
    ){

        return res.status(400).json({
            mensaje:"Campos incompletos"
        });

    }

    db.query(
        `
        INSERT INTO pacientes
        (nombre,telefono,correo)
        VALUES(?,?,?)
        `,
        [nombre,telefono,correo],
        (err)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                mensaje:"Paciente agregado"
            });

        }
    );

});


// ELIMINAR
router.delete("/:id",auth,(req,res)=>{

    db.query(
        "DELETE FROM pacientes WHERE id=?",
        [req.params.id],
        (err)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                mensaje:"Paciente eliminado"
            });

        }
    );

});

module.exports = router;
