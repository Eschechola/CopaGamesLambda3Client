import { Routes, Route } from 'react-router-dom';

const routes = () => {
    return(
        <Routes>
            <Route path="/" />
            <Route path="/games" />
            <Route path="/matches-result" />
        </Routes>
    );
}

export default routes;