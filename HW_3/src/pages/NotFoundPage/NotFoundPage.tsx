import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "../../shared/ui";
import { ROUTES } from "../../shared/config/routes";

export default function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <div className="centerPage">
            <Card className="notFoundCard">
                <div className="notFoundTop">
                    <div className="notFoundCode">404</div>
                    <h1 className="notFoundTitle">{t("common.notFound")}</h1>
                </div>

                <div className="notFoundDesc">{t("common.notFoundHint")}</div>

                <div className="notFoundActions">
                    <Link className="btn" to={ROUTES.ROOT}>
                        {t("nav.dashboard")}
                    </Link>
                    <button className="btn secondary" onClick={() => window.location.reload()}>
                        {t("errorBoundary.reload")}
                    </button>
                </div>
            </Card>
        </div>
    );
}