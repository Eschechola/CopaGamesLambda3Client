import IGame from "../interfaces/IGame";
import _apiService from "./api.service"

export const getGamesAsync = async (): Promise<IGame[]> => {
    const response = await _apiService.get("/game/get-all");
    
    if(response?.data?.success)
        return response?.data?.data as IGame[];
    
    throw new Error('An error has been occured, please try again');
}

export const sendGamesToMatches = async (gamesToMatch: IGame[]): Promise<IGame[]> => {
    const body = {
        games: gamesToMatch
    }

    const response = await _apiService.post("/game/start-matches", body);

    if(response?.data?.success)
        return response?.data?.data as IGame[];

    throw new Error('An error has been occured, please try again');
}