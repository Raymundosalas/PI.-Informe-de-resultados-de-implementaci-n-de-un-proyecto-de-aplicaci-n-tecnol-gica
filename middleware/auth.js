const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            mensaje:"Token requerido"
        });
    }

    try{

        const verificar = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = verificar;

        next();

    }catch(error){

        return res.status(401).json({
            mensaje:"Token inválido"
        });

    }

}
