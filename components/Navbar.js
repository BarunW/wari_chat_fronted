import TimeCounter from "./TimeCounter";

const Navbar = (props) => {
    return (
        <nav className="bg-black text-white flex justify-between p-2 overflow-hidden w-full items-center fixed top-0 left-0 right-0 z-10 font-black">
            <h3>{props.roomName}</h3>
            <div>
                <p>Your Chat Ends In</p>
                <TimeCounter roomId = {props.id} timeOut = {props.endRoom}/>
            </div>  
            {props.user === '100' ? 
                <h3 className="cursor-pointer border-2 border-green hover:opacity-30 " onClick={props.endRoom}>End Room</h3> 
                : <h3 onClick={props.fLeave} className=" cursor-pointer hover:opacity-30">Leave</h3>
            }
            <h3>{props.id}</h3>
        </nav>
    );

}
export default Navbar;