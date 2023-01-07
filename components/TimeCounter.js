import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

import axios from "../utils/axios";

const TimeCounter = ({ initialData,roomId, timeOut }) => {
    const router = useRouter()

    const [second, setSecond] = useState(initialData ? initialData.sec : 60);
    const [hour, setHour] = useState(initialData ? initialData.hr : 0);
    const [minute, setMinute] = useState(initialData ? initialData.min : 0);
    const [state, setState] = useState(false);
  
    const data = {
      recieveRoomId: roomId
    };
  
    useEffect(() => {
      const getData = async () => {
        try{
            const response = await axios.post("/room/get_time_data", data);
            setHour(response.data.hr);
            setMinute(response.data.min);
            setSecond(response.data.sec);
            setState(prevState => !prevState);

            if(response.data.min === 0 && response.data.hr === 0 && second === 60){
              timeOut();
            }

        }catch(err){
            return (() =>{
                
            })
        }
      };
      getData();
    }, [state]);
  
    // const clickHandler = async () => {
    //   axios.post("/room/start_time", data);
    // };
  
    return (
      <>
        <div className="w-32 flex justify-around border-2 border-cyan-500 rounded p-2">
          <h2 className="text-2xl">{hour}</h2>
          <span className="text-2xl">:</span>
          <h2 className="text-2xl">{minute}</h2>
          <span className="text-2xl">:</span>
          <h2 className="text-2xl">{second}</h2>
        </div>
      </>
    );
  };
  
  export async function getServerSideProps (context) {
      const {roomId,timeOut} = await context.query
      const response = await axios.post("/room/get_time_data", {
      recieveRoomId: roomId
    });
  
    return {
      props: {
        initialData: response.data,
        roomId : roomId,
        timeOut : timeOut
      }
    };
  };


export default TimeCounter;
