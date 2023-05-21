import { BrowserRouter, Route, Routes } from "react-router-dom";

import Config from "./pages/config";
import Home from "./pages/home";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={Home} path="/" />
                <Route Component={Config} path="/config" />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
