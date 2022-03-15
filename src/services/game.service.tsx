import IGame from "../interfaces/IGame";
import _apiService from "./api.service"

export const getGamesAsync = async (): Promise<IGame[]> =>{
    const response = await _apiService.get("https://localhost:44349/api/v1/game/get-all");
    
    if(response?.data?.success)
        return response?.data?.data as IGame[];
    
    throw new Error('An error has been occured, please try again');
}