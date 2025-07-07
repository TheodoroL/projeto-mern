import axios from "axios";
export async function getAllNews() {
    const baseUrl = import.meta.env.VITE_URL_API;
    const response = await axios.get(`${baseUrl}/news`);
    return response.data.newsResponse;
}