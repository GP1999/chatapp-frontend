import io from 'socket.io-client';
import {BACK_URL} from '../config.json';
const socket=io(BACK_URL,{
    autoConnect: false
});

socket.on('connect',()=>{
    console.log(`socket connection esablisted with id ${socket.id}`)
})
socket.on("connect_error", (err) => {
    console.log(err instanceof Error); // true
    console.log(err.message); // not authorized
    console.log(err.data); // { content: "Please retry later" }
  });
 
export default socket;