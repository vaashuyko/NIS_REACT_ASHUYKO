import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/products";
import { ROUTES } from "../../shared/config/routes";
import { mapApiErrorToI18nKey, getApiErrorDebugMessage } from "../../shared/lib/apiError";
import { Card } from "../../shared/ui";

const parseId = (raw: string | undefined): number | null => {
    if (!raw) return null;
    const n = Number(raw);
    if (!Number.isFinite(n)) return null;
    const i = Math.floor(n);
    return i > 0 ? i : null;
};

export default function ProductDetailsPage() {
    const { t } = useTranslation();
    const params = useParams<{ id: string }>();

    const id = useMemo(() => parseId(params.id), [params.id]);

    const { data, isLoading, error } = useGetProductByIdQuery(id ?? 0, {
        skip: id === null,
    });

    const detailsErrorText = useMemo(() => {
        if (!error) return null;
        const key = mapApiErrorToI18nKey(error);
        const translated = t(key);
        if (translated && translated !== key) return translated;
        return getApiErrorDebugMessage(error) ?? t("products.detailsError");
    }, [error, t]);

    return (
        <div className="page">
            <div className="productsDetailsTop">
                <h1>{t("products.detailsTitle")}</h1>
                <Link className="btn secondary" to={ROUTES.PRODUCTS}>
                    {t("products.backToList")}
                </Link>
            </div>

            {id === null ? (
                <Card>
                    <div className="errorText">{t("products.invalidId")}</div>
                </Card>
            ) : isLoading ? (
                <Card>{t("common.loading")}</Card>
            ) : error ? (
                <Card>
                    <div className="errorText">{detailsErrorText ?? t("products.detailsError")}</div>
                </Card>
            ) : !data ? (
                <Card>{t("products.notFound")}</Card>
            ) : (
                <Card>
                    <div className="productDetails">
                        <div className="productMain">
                            <div className="productTitle">{data.title}</div>
                            <div className="muted">{data.description}</div>

                            <div className="productGrid">
                                <div className="row">
                                    <div className="rowLabel">{t("products.fields.category")}</div>
                                    <div className="rowValue">{data.category}</div>
                                </div>
                                <div className="row">
                                    <div className="rowLabel">{t("products.fields.price")}</div>
                                    <div className="rowValue">${data.price}</div>
                                </div>
                                <div className="row">
                                    <div className="rowLabel">{t("products.fields.rating")}</div>
                                    <div className="rowValue">{data.rating}</div>
                                </div>
                            </div>
                        </div>

                        {data.thumbnail ? (
                            <div className="productMedia">
                                <img className="productThumb" src={data.thumbnail} alt={data.title} />
                            </div>
                        ) : null}
                    </div>
                </Card>
            )}
        </div>
    );
}