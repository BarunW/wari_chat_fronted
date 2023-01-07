import { useState} from "react";
import axios from "../utils/axios";
import {useRouter} from "next/router";



const CreateRoom = () => { 
    const router = useRouter();
    
    const [roomData, setRoomData] = useState({
        roomName : 'wari anonymous',
        roomCloseInHr : "0",
        roomCloseInMin : "10",
        userRoles   : 100
    })

    const onChangeHandler = (event) =>{     
        const {name, value} = event.target
        setRoomData(prevState=>(
            {
                ...prevState,
                [name] : value  
            }
        ))
    }

    const handleSubmit = async(event) =>{
        
        event.preventDefault();


        try{
            const data = {
                roomName : roomData.roomName,
                roomCloseInHr : roomData.roomCloseInHr,
                roomCloseInMin  : roomData.roomCloseInMin,
            }
            const response = await axios.post('/room/create',data);
            
            router.replace({pathname:"/chatroom",query:{
                roomName : roomData.roomName,
                user: roomData.userRoles,
                roomId : response.data.roomId
            }
        })
            

            
        }catch(err){
            console.log(err);
        }   
    }

    return (
        <>
         
        <main className="h-screen bg-black  grid place-items-center text-white ">  
            <form className=" h-1/2 w-1/2 flex flex-col justify-center">
                <div className="flex flex-col w-full m-5">
                    <label htmlFor="1" className="ml-2 mb-2">Chat-Room Name: </label>
                    <input 
                        type="text"
                        className="w-1/2 text-white bg-black border-2 rounded ml-2 outline-2" 
                        value = {roomData.roomName}
                        name  = "roomName"
                        placeholder="Chat Room Name"
                        onChange={onChangeHandler}
                        id="1"
                    />
                </div>
                <div className="flex flex-col w-full m-5">
                    <label className="ml-2 mb-2">End Chat Room In: </label>
                        <div className="ml-2">
                            <select className="bg-black border-2 text-white  rounded" name = "roomCloseInHr" value={roomData.roomCloseInHr} onChange={onChangeHandler}>
                                <option value="0">Hours</option>
                                <option value="1">1 hours</option>
                                <option value="2">2 hours</option>
                                <option value="3">3 hours</option>
                                <option value="4">4 hours</option>
                                <option value="5">5 hours</option>
                            </select>   
                            <select className="bg-black border-2 text-white ml-1 rounded" name = "roomCloseInMin" value={roomData.roomCloseInMin} onChange={onChangeHandler}>
                                <option value ="4">Minutes</option>
                                <option value="9">10 minutes</option>
                                <option value="19">20 minutes</option>
                                <option value="29">30 minutes</option>
                                <option value="39">40 minutes</option>
                                <option value="49">50 minutes</option>
                            </select>
                        </div>
                        
                    </div>
                    <small className="m-5">
                        <p>The chat will be available for above specific time you set</p>
                        <p>After this time chat will no longer available from our site</p>
                    </small>
           
                <button  className="border-2 rounded w-1/3 ml-5"onClick={handleSubmit}>Create Now</button> 
            </form>
        </main>
          
        </>
    );
}
 
export default CreateRoom;