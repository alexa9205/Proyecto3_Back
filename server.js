// conectar la base de datos 
// variables de entorno 
// modelos en la base de datos (schemas ) 
// get + post en la base de datos 

// IMPORT DENDENCIES 
const express = require("express")
const app = express()

// INSTALAMOS las dependencias DONTEV y MONGOOSE
// NOS CREAMOS EL ARCHIVO .env donde guardamos la url que nos da mongoDB para conectar la aplicación 

// IMPORTAMOS LAS DEPENDENCIAS
const mongoose = require("mongoose")
require("dotenv").config()

app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))



//importamos enrutamiento 
const UserRouter = require("./routes/UserRouter")



// app = http://localhost:5000 + /api + los endpoints que he definido en cada Router



// utilizamos el enrutamiento en el servidor
app.use("/api", UserRouter)
// CONNECT TO DB

// DECLARAMOS UNA VARIABLE DONDE GUARDAREMOS EL DATOS QUE NOS VIENE DEL ARCHIVO .env 
const URL = process.env.MONGO_URL

// con la ayuda de mongoose y su función .connect hacemos la conexión con nuestra base de datos
mongoose.connect(URL,{}).then(()=>{
  console.log("DB is now connected")
}).catch((error)=>{
  console.log(error)
})






// RESPONSE SERVER WHEN ID CONNECTED
app.listen(5000,()=>{
  console.log("Server is running on port 5000")
})