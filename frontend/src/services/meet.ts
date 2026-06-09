import axios from "axios"
import type { DraftMeet } from "../model/DraftMeet"
import type { Meet } from "../model/Meet"

class MeetService {

    async getMeetByDevGroup(id: string): Promise<Meet[]> {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REST_SERVER_URL}/meets/devGroup/${id}`)
            return data
        } catch (e) {
            alert(e)
            throw e
        }
    }
    
    async getMeetDetailsById(id: string): Promise<Meet> {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REST_SERVER_URL}/meets/${id}`)
            return data
        } catch (e) {
            alert(e)
            throw e
        }
    }

    async newMeet(draft: DraftMeet): Promise<Meet> {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_REST_SERVER_URL}/meets/new`, draft)
            return data
        } catch (e) {
            alert(e)
            throw e
        }
    }

    async updateMeet(id: string, draft: Meet): Promise<Meet> {
        try {
            const { data } = await axios.patch(`${import.meta.env.VITE_REST_SERVER_URL}/meets/update/${id}`, draft)
            return data
        } catch (e) {
            alert(e)
            throw e
        }
    }

    async deleteMeet(id: string): Promise<void> {
        try {
            await axios.delete(`${import.meta.env.VITE_REST_SERVER_URL}/meets/delete/${id}`)
        } catch (e) {
            alert(e)
            throw e
        }
    }
}

const meetService = new MeetService()
export default meetService
