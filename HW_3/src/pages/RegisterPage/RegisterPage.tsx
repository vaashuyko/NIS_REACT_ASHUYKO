import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/config/routes";
import { Button, Card } from "../../shared/ui";

export default function RegisterPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="authPage">
            <div className="authCard">
                <h1 className="authTitle">{t("auth.register")}</h1>

                <Card className="authInner">
                    <div className="muted">{t("auth.registerStub")}</div>

                    <div className="authActions">
                        <Button onClick={() => navigate(ROUTES.LOGIN)}>{t("auth.login")}</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}