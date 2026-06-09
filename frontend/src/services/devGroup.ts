import axios from "axios"

class DevGroupService { 

    async getAllDevGroup(){
        try{

            const {data} = await axios.get(`${import.meta.env.VITE_REST_SERVER_URL}/devGroups`)

            return data

        }catch(e){alert(e)}
    }
}

const devGroupService = new DevGroupService()
export default devGroupService