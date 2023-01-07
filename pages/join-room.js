import { useState } from "react";
import axios from "../utils/axios";
import {useRouter} from "next/router";
import Link from "next/link";




const JoinRoom = () => { 
    const router = useRouter();

    const [inputRId, setInputRId] = useState('');

    const onChangeHandler = (event) =>{     
        setInputRId(event.target.value);
    }


    const handleSubmit = async(event) =>{
        event.preventDefault();
        try{
            const response = await axios.post('/room/join',{recieveRoomId:inputRId});
            console.log(response);
            router.push({pathname:"/chatroom",query:{
                roomName : response.data.roomName,
                user: 50,
                roomId : response.data.roomId
            }})            
        }catch(err){
            console.log(err);
        }   
    }
    return (
        <>
         
        <main className="h-screen bg-black grid place-items-center text-white ">  
            <form className="border-2 h-1/2 w-1/2 flex flex-col justify-center">
                <div className="flex flex-col w-full m-5">
                    <label htmlFor="1" className="ml-2 mb-2">Chat-Room id: </label>
                    <input 
                        type="text"
                        className="w-1/2 text-white bg-black border-2 rounded ml-2 outline-2" 
                        placeholder="Enter the room Id"
                        onChange={onChangeHandler}
                        id="1"
                    />
                </div>
                <button  className="border-2 rounded w-1/3 ml-7"onClick={handleSubmit}>Join Now</button> 
            </form>
            <Link className="text-blue" href="/create-room">Create Room</Link>
        </main>
          
        </>
    );
}
 
export default JoinRoom;