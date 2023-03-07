/**
 * io hace referencia a socket.io, se llama así por convención
 * Esta línea permite instanciar el socket del lado del cliente, y almacenarlo en una variable
 * Dicho socket es el que utilizaremos para comunicarnos con el servidor
 * (Recuerda que este código se ejecuta en el navegador del cliente, dentro de nuestra vista).
 */
// Swal.fire({
//     title: 'Hola, coders',
//     text: 'Alerta básica con SweetAlert2',
//     icon: 'success'
// });

console.log('Hello, from Soket.io_Client');

const socket= io();

// Declaramos la variable user para alojar nuestro usuario una vez que se identifique
let user;

Swal.fire({
    title: "identificate",
    input: "text", // Especificamos que necesitamos de un input de tipo texto.
    text: "Ingresa el usuario para identificarte en el chat",
    // La siguiente función  definira una varlidacion para el input.
    // en nuestro caso verificaremos que el nombre de usuario ingresado no esté vacío
    inputValidator: (value) => {
        return !value && "¡Necesitas escribir un nombre de usuario para continuar!";
    },
    // Esta opción evita que el usuario pueda cerrar el dialogo haciendo click fuera de él.
    allowOutsideClick: false,
}).then((result) => {
    // Una vez que el usuario ungresa un nombre, lo asignamos a la variable user.
    user= result.value;
    
//añadido en clase, no testeado
    socket.emit("new-user", user)
});

// Obtenemos una referencia al elemento con id chat-box
const chatBox= document.getElementById("chat-box");
const sendButton= document.getElementById("send");

/**
 * Agregamos un event listener, que nos permitirá escuchar eventos del navegador
 * En este caso, escucharemos el evento keyup, que se dispara cada vez que una tecla se suelta.
 */
//----------------------------------------------------
// chatBox.addEventListener("keyup", (ev) => {
    //     /**
    //      * Si la tecla presionada es Enter y la longitud del mensaje es mayor a 0, enviamos el mensaje y limpiamos el input.
    //      */
//     if (ev.key === "Enter") {
//         console.log("touch Enter key")
//         const message= chatBox.value;

//         if(message.trim().length > 0) {
//             socket.emit("chat-message", { user, message });
//             chatBox.value= "";
//         }
//     }
// });
//----------------------------------------------------

//----------------------
sendButton.addEventListener("click", (ev) => {
    const message= chatBox.value;

    if(message.trim().length > 0) {
        socket.emit("chat-message", { user, message });
        chatBox.value= "";
    }
});
//----------------------


// Obtenemos una referencia al elemento con id message-logs.
const messageLogs= document.getElementById("message-logs");

// Cuando recibimos la lista actualizada de mensajes, los agregamos en este elemento, uno debajo del otro
socket.on("message-logs", (data) => {
    console.log("escucho el evento de mensaje que se mando")
    let messages= "";
    data.forEach((message) => {
        messages += `<b>${message.user}</b>: ${message.message}</br>`;
    });
    messageLogs.innerHTML= messages;
});