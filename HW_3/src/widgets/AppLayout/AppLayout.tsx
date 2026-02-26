import { Outlet, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../shared/config/routes";

export const AppLayout = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === ROUTES.ROOT) return location.pathname === ROUTES.ROOT;
        return location.pathname.startsWith(path);
    };

    return (
        <div className="layout">
            <header className="header">
                <div className="headerTitle">{t("app.title")}</div>
            </header>

            <div className="body">
                <aside className="sidebar">
                    <Link className={isActive(ROUTES.ROOT) ? "navLink active" : "navLink"} to={ROUTES.ROOT}>
                        {t("nav.dashboard")}
                    </Link>
                    <Link
                        className={isActive(ROUTES.PRODUCTS) ? "navLink active" : "navLink"}
                        to={ROUTES.PRODUCTS}
                    >
                        {t("nav.products")}
                    </Link>
                    <Link
                        className={isActive(ROUTES.PROFILE) ? "navLink active" : "navLink"}
                        to={ROUTES.PROFILE}
                    >
                        {t("nav.profile")}
                    </Link>
                    <Link
                        className={isActive(ROUTES.SETTINGS) ? "navLink active" : "navLink"}
                        to={ROUTES.SETTINGS}
                    >
                        {t("nav.settings")}
                    </Link>
                    <Link className="navLink" to={ROUTES.LOGOUT}>
                        {t("nav.logout")}
                    </Link>
                </aside>

                <main className="content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};