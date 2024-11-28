import { useEffect, useState } from "react";
import useAuth from "../context/useAuth";
import useRefreshToken from "../context/useRefreshToken";
import { Outlet } from "react-router-dom";

const Persist = () => {
    const { auth, persist } = useAuth();
    const refresh = useRefreshToken();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAccessToken = async () => {
            try {
                if (!auth?.accessToken && persist) {
                    await refresh(); // Refresh token if the flag is true
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        persist ? verifyAccessToken() : setLoading(false);
    }, [auth?.accessToken, persist, refresh]);

    return (
        <>
            {!persist ? <Outlet /> : loading ? <h1>Loading...</h1> : <Outlet />}
        </>
    );
};

export default Persist;
