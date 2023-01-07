import {useRouter} from "next/router";
import { useEffect, useState} from "react";
import io from 'socket.io-client'
import Navbar from "../components/Navbar";
import { nanoid } from "nanoid";
import axios from "../utils/axios";
import moment from "moment/moment";



const socket = io.connect("http://localhost:7000");

const ChatRoom = (props) => {
    

    const router = useRouter();
    const[isUserJoin, setUserJoin] = useState(false);

    const[message, setMessage] = useState(
        {
            textMessage : '',
        }
    )
    
    const [allMessage,setAllMessages] = useState([])
            
    const {roomId, roomName, user} = props
    
    

    const sendMsg = async() =>{

        const data ={
            msg: message.textMessage,
            roomId : props.roomId
        }
        if(message.textMessage !== ''){
            await socket.emit("send_message",data);
            message.textMessage = ''
        }
     

    }

    useEffect(() =>{

            socket.on("my_message",(msg) =>{
                console.log("my message ")
                // myMessageHandler(msg);
                setAllMessages(prevState => 
                    [   ...prevState, 
                        <div key={nanoid()} className="col-start-2">
                            <div className="w-1/2 bg-green-500 ml-80 mt-5 p-2 rounded ">
                                {msg}
                                <small><p>{moment().format('LTS')}</p></small>
                            </div>  
                        </div>
                    ])
            })
            socket.on("other_message",(msg) =>{
               setAllMessages(prevState =>
                [   ...prevState,
                    <div className="col-start-1" key={nanoid()}>  
                        <div className="w-1/2 bg-blue-800 m-12 p-2 rounded  ">
                            {msg}
                            <small><p>{moment().format('LTS')}</p></small>
                        </div>
                     </div>

                ])
            })
            socket.on("room_closed",(data) =>{
                router.push("/join-room");
            })
        

    },[socket]);


    const onChangeHandler = (event) =>{     
        const {name, value} = event.target
        setMessage(prevState=>(
            {
                ...prevState,
                [name] : value  
            }
        ))
    }

    const joinRoom = async() =>{
        try{
            await socket.emit('join_room',roomId);
            setUserJoin(true)
            await axios.post("/room/start_time", {recieveRoomId:roomId});
        }catch(err){
            console.log(err);
        }
        
    }
    const onLoad =async() =>{
        try{
            const response = await axios.post("/room/refresh",{recieveRoomId:props?.roomId});
            console.log(response);
        }catch(err){
            router.push("/create-room");
        }
    }

    useEffect(() =>{
        onLoad();

    },[router])

  

    const leaveRoom = async() => {
        try{
            await socket.emit("leave_room",roomId);
            router.replace("/")
        }catch(err){
            console.log(err);
        }
    }

     async function onClickEndRoom(){
        try{
            await axios.post("/room/close",{recieveRoomId : roomId});
            await socket.emit("end_room",{roomName : roomName, roomId:roomId});
            await socket.off();
            await router.replace("/");
            
        }catch(err){
            console.log(err);
        }
        
    }
    

    return ( 
        <div>
            <Navbar roomName={roomName} id={roomId} user={user} fLeave = {leaveRoom} endRoom={onClickEndRoom}/>
            <div className="w-full h-screen bg-black text-white grid place-items-center">
                {
                    isUserJoin === false ?
                        <>
                        <p className="border-2 border-green-600 rounded font-bold r">This is chat Room</p>
                        <button onClick={joinRoom}>Start Chat </button>
                        </>
                    :
                    <>
                        <div className="w-full h-4/6 overflow-y-scroll bg-black grid gap-1 grid-cols-2  border-2 " > 
                           
                           {allMessage}

                        </div>  
                        <div className="w-full p-2 bg-black text-white flex-row py-4 ml-5 fixed bottom-0 left-0 right-0 z-10">
                            <input 
                                name="textMessage"
                                onChange={onChangeHandler}
                                value={message.textMessage}
                                className = " w-5/6 h-5/6 p-3 bg-black text-base text-white border-2 border-cyan-500 rounded "
                            />
                            <button onClick={sendMsg} className="h-5/6 text-base border-2 border-green rounded ml-2 p-3">Send-/\</button>
                        </div>
                    
                    </>
                }

            </div>
        </div>
    );

    
}

export async function getServerSideProps(context){
    const {roomId, roomName, user} = await context.query    
    const {res} = context
    if(!roomId){
        res.writeHeader(307, {Location:"/create-room"});
        res.end();
        return{props:{}};
    }
    else{
        return {
            props:{
                roomId,
                roomName,
                user
            }
        }
    }
}
 
export default ChatRoom;    