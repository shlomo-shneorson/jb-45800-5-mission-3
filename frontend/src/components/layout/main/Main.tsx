import { Route, Routes } from "react-router-dom";
import MeetList from "../../meet/meetList/MeetList";
import NewMeet from "../../meet/newMeet/NewMeet";
import UpdateMeet from "../../meet/updateMeet/UpdateMeet";

export default function Main() {
    return (
        <Routes>
           <Route path="/" element={<MeetList/>}/>
           <Route path="/new" element={<NewMeet/>}/>
           <Route path="/update/:id" element={<UpdateMeet/>}/>
        </Routes>
    )
}