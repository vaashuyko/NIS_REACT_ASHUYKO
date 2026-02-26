import { useEffect } from "react";
import { AppRouter } from "./router/AppRouter";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { initAuth, selectToken } from "../features/auth";

export const App = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);

    useEffect(() => {
        if (!token) return;
        void initAuth(dispatch);
    }, [dispatch, token]);

    return <AppRouter />;
};