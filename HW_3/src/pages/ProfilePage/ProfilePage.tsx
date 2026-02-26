import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserEmail, selectUserName } from "../../entities/user";
import { logout } from "../../features/auth";
import { ROUTES } from "../../shared/config/routes";
import { Button, Card } from "../../shared/ui";
import { baseApi } from "../../shared/api/baseApi";

export default function ProfilePage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const name = useSelector(selectUserName);
    const email = useSelector(selectUserEmail);

    const safeName = useMemo(() => name ?? "-", [name]);
    const safeEmail = useMemo(() => email ?? "-", [email]);

    const onLogout = () => {
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        navigate(ROUTES.LOGIN, { replace: true });
    };

    return (
        <div className="page">
            <h1>{t("nav.profile")}</h1>

            <Card>
                <div className="profileRow">
                    <div className="rowLabel">{t("profile.name")}</div>
                    <div>{safeName}</div>
                </div>

                <div className="profileRow">
                    <div className="rowLabel">{t("profile.email")}</div>
                    <div>{safeEmail}</div>
                </div>

                <div className="profileActions">
                    <Button onClick={onLogout}>{t("profile.logout")}</Button>
                </div>
            </Card>
        </div>
    );
}