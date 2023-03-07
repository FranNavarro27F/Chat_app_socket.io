import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';


const app= express();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/../public"))


app.use('/views', viewsRouter);


const httpServer= app.listen(8080, () => {
    console.log('Listen on PORT 8080');
});
 
const io= new Server(httpServer);

let messages= [];// Array donde almacenaremos los mensajes.

io.on("connection", (soket) => {
    console.log(`Nuevo cliente conectado: ${soket.id}`);

    /**
     * Escuchamos eventos de tipo 'chat-message' (recordemos que es el mismo nombre que usamos en el cliente. Cliente=[/public/js/index.js]).
     */

    soket.on("chat-message", (data) => {
        // Actualizamos los mensajes
        messages= [...messages, data];

        // Emitimos un nuevo evento de tipo 'message-logs' con los mensajes actualizados.
        io.emit("message-logs", messages);
    });
});
