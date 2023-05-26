import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const NavLayout = ({children}) => {
    return <>
        {children}
        <Outlet />
    </>
};

export default function ProtectedRoutes({user, isHidden}) {
    if (isHidden) return <NavLayout></NavLayout>;
    
    switch(user) {
        case "ROLE_USER":
            return <NavLayout><UserNavbar/></NavLayout>;
        case "ROLE_ADMIN":
            return <NavLayout></NavLayout>;
        default:
            return <NavLayout></NavLayout>
            // return <Navigate to="/login" replace/>;
        }
};