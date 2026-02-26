import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { selectProductsPageSize } from "../../features/settings";
import { useGetProductsQuery, useSearchProductsQuery } from "../../features/products";
import { ROUTES } from "../../shared/config/routes";
import { mapApiErrorToI18nKey, getApiErrorDebugMessage } from "../../shared/lib/apiError";
import { Button, Card, Input } from "../../shared/ui";

const LIMIT_VALUES: readonly number[] = [8, 12, 16, 24] as const;

const clampNonNegInt = (v: number): number => (Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);

const parseQueryInt = (raw: string | null): number | null => {
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? Math.floor(n) : null;
};

export default function ProductsPage() {
    const { t } = useTranslation();
    const defaultLimit = useSelector(selectProductsPageSize);

    const [searchParams, setSearchParams] = useSearchParams();

    const qParam = (searchParams.get("q") ?? "").trim();
    const limitParam = parseQueryInt(searchParams.get("limit"));
    const skipParam = parseQueryInt(searchParams.get("skip"));

    const limit = useMemo(() => {
        const candidate = limitParam ?? defaultLimit;
        if (LIMIT_VALUES.includes(candidate)) return candidate;
        return defaultLimit;
    }, [defaultLimit, limitParam]);

    const skip = useMemo(() => clampNonNegInt(skipParam ?? 0), [skipParam]);

    const [qInput, setQInput] = useState<string>(qParam);

    useEffect(() => {
        setQInput(qParam);
    }, [qParam]);

    const isSearch = qParam.length > 0;

    const listQueryArg = useMemo(() => {
        if (isSearch) return skipToken;
        return { limit, skip };
    }, [isSearch, limit, skip]);

    const searchQueryArg = useMemo(() => {
        if (!isSearch) return skipToken;
        return { q: qParam, limit, skip };
    }, [isSearch, qParam, limit, skip]);

    const listQuery = useGetProductsQuery(listQueryArg);
    const searchQuery = useSearchProductsQuery(searchQueryArg);

    const activeQuery = isSearch ? searchQuery : listQuery;

    const products = activeQuery.data?.products ?? [];
    const total = activeQuery.data?.total ?? 0;

    const isLoading = activeQuery.isLoading;
    const isError = Boolean(activeQuery.error);

    const canPrev = skip > 0 && !isLoading;
    const canNext = skip + limit < total && !isLoading;

    const setParams = (next: { q: string; limit: number; skip: number }) => {
        const p = new URLSearchParams();
        if (next.q.trim().length > 0) p.set("q", next.q.trim());
        p.set("limit", String(next.limit));
        p.set("skip", String(next.skip));
        setSearchParams(p, { replace: true });
    };

    const onApplySearch = () => {
        setParams({ q: qInput.trim(), limit, skip: 0 });
    };

    const onClearSearch = () => {
        setQInput("");
        setParams({ q: "", limit, skip: 0 });
    };

    const onChangeLimit = (nextLimit: number) => {
        setParams({ q: qParam, limit: nextLimit, skip: 0 });
    };

    const onPrev = () => {
        setParams({ q: qParam, limit, skip: Math.max(0, skip - limit) });
    };

    const onNext = () => {
        setParams({ q: qParam, limit, skip: skip + limit });
    };

    const productsErrorText = useMemo(() => {
        if (!activeQuery.error) return null;
        const key = mapApiErrorToI18nKey(activeQuery.error);
        const translated = t(key);
        if (translated && translated !== key) return translated;
        return getApiErrorDebugMessage(activeQuery.error) ?? t("products.error");
    }, [activeQuery.error, t]);

    return (
        <div className="page">
            <h1>{t("nav.products")}</h1>

            <Card>
                <div className="productsToolbar">
                    <div className="productsSearch">
                        <Input
                            value={qInput}
                            placeholder={t("products.searchPlaceholder")}
                            onChange={(e) => setQInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") onApplySearch();
                            }}
                        />
                        <Button onClick={onApplySearch} disabled={isLoading}>
                            {t("products.search")}
                        </Button>
                        <Button variant="secondary" onClick={onClearSearch} disabled={isLoading}>
                            {t("products.clear")}
                        </Button>
                    </div>

                    <div className="productsPager">
                        <div className="productsMeta muted">
                            {t("products.total")}: {total}
                        </div>

                        <select
                            value={limit}
                            onChange={(e) => onChangeLimit(Number(e.target.value))}
                            disabled={isLoading}
                        >
                            {LIMIT_VALUES.map((v) => (
                                <option key={v} value={v}>
                                    {t("products.limit")}: {v}
                                </option>
                            ))}
                        </select>

                        <Button variant="secondary" onClick={onPrev} disabled={!canPrev}>
                            {t("products.prev")}
                        </Button>
                        <Button variant="secondary" onClick={onNext} disabled={!canNext}>
                            {t("products.next")}
                        </Button>
                    </div>
                </div>
            </Card>

            {isLoading ? (
                <Card>{t("common.loading")}</Card>
            ) : isError ? (
                <Card>
                    <div className="errorText">{productsErrorText ?? t("products.error")}</div>
                </Card>
            ) : products.length === 0 ? (
                <Card>{t("products.empty")}</Card>
            ) : (
                <Card>
                    <div className="productsTable">
                        <div className="productsHead">
                            <div className="productsCol title">{t("products.columns.title")}</div>
                            <div className="productsCol">{t("products.columns.category")}</div>
                            <div className="productsCol">{t("products.columns.price")}</div>
                            <div className="productsCol">{t("products.columns.rating")}</div>
                        </div>

                        {products.map((p) => (
                            <Link key={p.id} to={ROUTES.PRODUCTS + "/" + p.id} className="productsRow">
                                <div className="productsCol title">{p.title}</div>
                                <div className="productsCol">{p.category}</div>
                                <div className="productsCol">${p.price}</div>
                                <div className="productsCol">{p.rating}</div>
                            </Link>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}