import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Games from '../pages/games/games';
import MatchesResult from '../pages/matches-result/matches-result';

const routes = (): ReactElement => {
        return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Games/>} />
                <Route path="/games" element={<Games/>}/>
                <Route path="/matches-result" element={<MatchesResult/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default routes;