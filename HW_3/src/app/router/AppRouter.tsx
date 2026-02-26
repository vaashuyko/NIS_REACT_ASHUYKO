import { Suspense, lazy } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicOnlyRoute } from "./PublicOnlyRoute";
import { ROUTES } from "./routes";
import { AppLayout } from "../../widgets/AppLayout/AppLayout";
import { NotFoundRoute } from "./NotFoundRoute";

const DashboardPage = lazy(() => import("../../pages/DashboardPage/DashboardPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage/RegisterPage"));
const ProductsPage = lazy(() => import("../../pages/ProductsPage/ProductsPage"));
const ProductDetailsPage = lazy(() => import("../../pages/ProductDetailsPage/ProductDetailsPage"));
const ProfilePage = lazy(() => import("../../pages/ProfilePage/ProfilePage"));
const SettingsPage = lazy(() => import("../../pages/SettingsPage/SettingsPage"));
const LogoutPage = lazy(() => import("../../pages/LogoutPage/LogoutPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));

export const AppRouter = () => {
    const { t } = useTranslation();

    return (
        <BrowserRouter>
            <Suspense fallback={<div className="page">{t("common.loading")}</div>}>
                <Routes>
                    <Route element={<PublicOnlyRoute />}>
                        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route element={<AppLayout />}>
                            <Route path={ROUTES.ROOT} element={<DashboardPage />} />
                            <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
                            <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetailsPage />} />
                            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
                            <Route path={ROUTES.LOGOUT} element={<LogoutPage />} />
                        </Route>
                    </Route>

                    <Route
                        path={ROUTES.NOT_FOUND}
                        element={
                            <NotFoundRoute>
                                <NotFoundPage />
                            </NotFoundRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};