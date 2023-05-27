import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import AdminNavbar from "./AdminNavbar";

const NavLayout = ({children}) => {
    return <>
        {children}
        <Outlet />
    </>
};

export default function ProtectedRoutes({user, isHidden, onLogout}) {
    if (isHidden) return <NavLayout></NavLayout>;
    
    switch(user) {
        case "USER":
            return <NavLayout><UserNavbar onLogout={onLogout}/></NavLayout>;
        case "ADMIN":
            return <NavLayout><AdminNavbar /></NavLayout>;
        default:
            return <NavLayout></NavLayout>
            // return <Navigate to="/login" replace/>;
        }
};