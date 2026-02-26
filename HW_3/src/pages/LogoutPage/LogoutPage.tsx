import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth";
import { Card } from "../../shared/ui";
import { baseApi } from "../../shared/api/baseApi";

export default function LogoutPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
    }, [dispatch]);

    return (
        <div className="page">
            <Card>{t("auth.loggingOut")}</Card>
        </div>
    );
}