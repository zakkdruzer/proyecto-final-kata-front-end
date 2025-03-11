import { Routes, Route } from "react-router";
import App from "../App";

const ConfigRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App /> } />
            </Routes>
        </>
    )
}

export default ConfigRoutes