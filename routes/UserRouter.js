const express = require("express")
const UserRouter= express.Router() 
const User = require("../models/User") 


// crear un usuario

// POST
UserRouter.post("/register", async (req,res)=>{
    const {name, surname, email, password} =  req.body
    try {

    //compruebo si hay alguno usuario creado en mi BD con el mismo email
    let userFind = await User.findOne({email})
    if(userFind){
        return res.status(400).send({
            success:false,
            message:"No puedes utilizar este email, ya hay alguien registrado"
        })
    }
    //condiciones de validaciónes
    if(!name || !email || !password || !surname){
        return res.status(400).send({
            success:false,
            message:"No has completado todos los campos"
        })
    }

    if(name.length <3){
        return res.status(400).send({
            success:false,
            message:"Nombre demasiado corto"
        })
    }

    if(name.length > 15){
        return res.status(400).send({
            success:false,
            message:"Nombre demasiado largo"
        })
    }
  

    let myUser = new User({
        name, 
        email,
        surname,
        password
    })

    await myUser.save()

    return res.status(201).send({
        success:true,
        message:"Tu cuenta se ha creado correctamente!",
        myUser
    })

    } catch (error) {
        return res.status(500).send({
            success:false,
            message:error.message
        })
    }
})



// GET de todos los usuarios 

UserRouter.get("/users", async (req,res)=>{
    try {
        //busco dentro de mi coleccion User todos los usuarios
        // el metodo find() es la función de mongoose que me devuelve todos los usuarios
        // {} - para que me devuelva todos los objetos en una ARRAY

        // let usuarios = await User.find({}).select("name surname") - si solo quiero que me devuelva el nombre del usuario
     

        let usuarios = await User.find({})

        // si no encuentra usuarios me devuelve el mensaje que yo le defino 
        if(!usuarios){
            return res.status(400).send({
                success:false, 
                message:"No hay usuarios en la base de datos"
            })
        }
   
        // si me encuentra usuarios, me devuelve todos los usuarios 
        return res.status(200).send({
            success:true,
            usuarios
        })
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:error.message
        })
    }
})
//req.body - requerimos por body ( lo que estoy por la pantalla )
//req.params = lo que se me añade a la url ( parametros )

// ruta de coger un solo usuario (producto, alojamiento, reserva, vendendor, etc.)
UserRouter.get("/user/:userId", async(req, res)=>{
    try {
    const {userId} = req.params // request params - lo estoy requiriendo por parametros

    //busco dentro de mi colección de usuarios un user en concreto, deinido por su id 
    // si quiero mostrar solo x propiedades de ese usuario utilizo el metodo .select()
    let user = await User.findById(userId).select("name surname email")
    if(!user){
        return res.status(400).send({
            success:false,
            message:"User not defined"
        })

        // return res.status(400).json({   // poner .json({}), despues del .status, equivale lo mismo que .send()
        //     success:false,
        //     message:"User not defined"
        // })
    }

    return res.status(200).send({
        success:true, 
        message:"Usuario encontrado",
        user
    })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:error.message
        })
    }
})


module.exports = UserRouter

// crear el mapa de nuestra aplicación y definimos los endpoints

// compruebo que tengo todos los post 

// hacemos el .get() de toda la colección y .get() de un producto en concreto

// - User Router - que necesito ? 
// 1. crear usuario .post("/register") - ruta para crear el usuario - todo el mundo 
// 2. login de usuario .post("/login") - todo el mundo 
// 3. modificar un usuario .put("/modify_user") - usuario logueado
// 4. ver perfil de un usuario como usuario logueado .get("/user") - usuario logueado
// 5. ver perfil usuario como admin .get("/user/:id") - usuario logueado + admin
// 6. ver todos los usuarios .get ("/users") - usuario logueado + admin
// 7. borrar usuario como usuario logueado .delete("/user")  - usuario logueado
// 8. borrar usuario como admin .delete("/user/:id") - usuario logueado + admin

// - ProductRouter - que necesito ? 
// 1. crear producto 
// 2. modificar producto
// 3. borrar producto
// 4. ver un producto
// 5. ver todos los productos 
// 6. ver productos por vendedor 

// - Alojamiento router  
// 1. crear alojamiento
// 2. ver alojamiento 
// 3. modificar alojamiento
// 4. borrar alojamiento 
// 5. ver todos los alojamientos 


// - Reserva router .
// 1. crear reserva (id de usuario + id de alojamiento )


