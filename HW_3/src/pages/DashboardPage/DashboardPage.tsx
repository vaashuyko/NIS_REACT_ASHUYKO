import { useTranslation } from "react-i18next";
import { Card } from "../../shared/ui";

export default function DashboardPage() {
    const { t } = useTranslation();

    return (
        <div className="page">
            <h1>{t("nav.dashboard")}</h1>
            <Card>{t("dashboard.stub")}</Card>
        </div>
    );
}