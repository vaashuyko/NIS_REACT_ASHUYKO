import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, setToken, setUser } from "../../features/auth";
import { ROUTES } from "../../shared/config/routes";
import { mapApiErrorToI18nKey, getApiErrorDebugMessage } from "../../shared/lib/apiError";
import { Button, Card, Input } from "../../shared/ui";

const DEFAULT_EXPIRES_IN_MINS = 60;

export default function LoginPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading, error }] = useLoginMutation();

    const [username, setUsernameState] = useState<string>("");
    const [password, setPasswordState] = useState<string>("");

    const canSubmit = useMemo(() => {
        return username.trim().length > 0 && password.trim().length > 0 && !isLoading;
    }, [username, password, isLoading]);

    const onSubmit = async () => {
        if (!canSubmit) return;

        const res = await login({
            username: username.trim(),
            password: password.trim(),
            expiresInMins: DEFAULT_EXPIRES_IN_MINS,
        }).unwrap();

        dispatch(setToken(res.accessToken));
        dispatch(
            setUser({
                id: res.id,
                username: res.username,
                email: res.email,
                firstName: res.firstName,
                lastName: res.lastName,
                gender: res.gender,
                image: res.image,
            })
        );
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        void onSubmit();
    };

    const errorText = useMemo(() => {
        if (!error) return null;

        const key = mapApiErrorToI18nKey(error);
        if (key === "apiErrors.invalidCredentials" || key === "apiErrors.unauthorized") {
            return t("apiErrors.invalidCredentials");
        }

        const translated = t(key);
        if (translated && translated !== key) return translated;

        return getApiErrorDebugMessage(error) ?? t("apiErrors.invalidCredentials");
    }, [error, t]);

    return (
        <div className="authPage">
            <div className="authCard">
                <h1 className="authTitle">{t("auth.login")}</h1>

                <Card className="authInner">
                    <form onSubmit={onFormSubmit}>
                        <label className="field">
                            <span>{t("auth.username")}</span>
                            <Input value={username} onChange={(e) => setUsernameState(e.target.value)} />
                        </label>

                        <label className="field">
                            <span>{t("auth.password")}</span>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPasswordState(e.target.value)}
                            />
                        </label>

                        <div className="authActions">
                            <Button type="button" variant="secondary" onClick={() => navigate(ROUTES.REGISTER)}>
                                {t("auth.register")}
                            </Button>

                            <Button type="submit" disabled={!canSubmit}>
                                {isLoading ? t("common.loading") : t("auth.submit")}
                            </Button>
                        </div>

                        {errorText ? <div className="errorText">{errorText}</div> : null}
                    </form>
                </Card>
            </div>
        </div>
    );
}