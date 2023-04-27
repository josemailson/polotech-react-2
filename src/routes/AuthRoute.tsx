import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IAuthRoutesProps {
    children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRoutesProps> = (props) => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AuthCheck();
    }, [auth]);
    
    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if(user) {
            setLoading(false);
        } else {
            navigate('/login');
        }
    });

    if (loading) return <p>Loading...</p>;

    return <div>{children}</div>
}

export default AuthRoute;