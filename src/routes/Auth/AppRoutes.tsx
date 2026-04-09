import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";


const AppRoutes = () => {
    return (
        <Routes>
            {/*<Route path="/login" element={<Login />} />*/}
            <Route path="/" element={<HomePage />} />
            {/*<Route path="/register" element={<SignUpPage />} />*/}
            {/*<Route path="/logout" element={<LogOutPage />}></Route>*/}
            {/*/!* All protected routes *!/*/}
            {/*<Route element={<ProtectedRoute />}>*/}
            {/*    <Route path="/profile" element={<ProfilePage />} />*/}

            {/*    /!* All admin-only routes *!/*/}
            {/*    <Route element={<AdminOnlyRoute />}>*/}
            {/*        <Route*/}
            {/*            path="/update-profile/:id"*/}
            {/*            element={<UpdateProfilePage />}*/}
            {/*        ></Route>*/}
            {/*    </Route>*/}
            {/*</Route>*/}
        </Routes>
    );
};

export default AppRoutes;
