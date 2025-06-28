const express = require('express')
const app = express()

app.set('view engine', "ejs")

const path = require('path')
app.use(express.static(path.join(__dirname,'public')))

const http = require('http')
const server = http.createServer(app)

const socketio = require('socket.io')
const io = socketio(server)

io.on("connection", (socket)=>
{
   console.log(`user connected, ${socket.id}`);
   
   socket.on('client-to-server', (data)=>
    {
        console.log(`user: ${socket.id} latitude: ${data.latitude} & longitude: ${data.longitude}`)

        io.emit('server-to-clients', { id: socket.id , ...data})
    }) 
    
    socket.on("disconnect", ()=>
        { 
            console.log(`${socket.id} disconnected`);
            io.emit("user-disconnected", socket.id)
        })

    
})

app.get('/',(req,resp)=>{
    resp.render("index.ejs")
})

server.listen(5000)