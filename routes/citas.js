const express = require("express");
const router = express.Router();

const db = require("../database");

const auth = require("../middleware/auth");


// OBTENER
router.get("/",auth,(req,res)=>{

    const sql = `
    SELECT citas.id,
           pacientes.nombre,
           citas.fecha,
           citas.hora,
           citas.observaciones
    FROM citas
    INNER JOIN pacientes
    ON citas.paciente_id = pacientes.id
    `;

    db.query(sql,(err,rows)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(rows);

    });

});


// CREAR
router.post("/",auth,(req,res)=>{

    const {
        paciente_id,
        fecha,
        hora,
        observaciones
    } = req.body;

    if(
        !paciente_id ||
        !fecha ||
        !hora
    ){

        return res.status(400).json({
            mensaje:"Campos incompletos"
        });

    }

    // VALIDAR DUPLICADO
    db.query(
        `
        SELECT * FROM citas
        WHERE fecha=? AND hora=?
        `,
        [fecha,hora],
        (err,rows)=>{

            if(rows.length>0){

                return res.status(400).json({
                    mensaje:"Horario ocupado"
                });

            }

            db.query(
                `
                INSERT INTO citas
                (paciente_id,fecha,hora,observaciones)
                VALUES(?,?,?,?)
                `,
                [
                    paciente_id,
                    fecha,
                    hora,
                    observaciones
                ],
                (err)=>{

                    if(err){
                        return res.status(500).json(err);
                    }

                    res.json({
                        mensaje:"Cita creada"
                    });

                }
            );

        }
    );

});


// ELIMINAR
router.delete("/:id",auth,(req,res)=>{

    db.query(
        "DELETE FROM citas WHERE id=?",
        [req.params.id],
        (err)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                mensaje:"Cita eliminada"
            });

        }
    );

});

module.exports = router;
