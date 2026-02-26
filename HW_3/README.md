Административная панель для e-commerce системы. 

Реализованы:
- авторизация/инициализация пользователя
- защищённые маршруты + общий layout приватной части
- каталог продуктов: список, поиск, пагинация, детальная страница
- профиль пользователя
- настройки приложения: тема, язык, размер страницы каталога
- i18n (ru/en) + отображение ошибок API
- Error Boundary для обработки непредвиденных ошибок

Backend API: DummyJSON (`https://dummyjson.com`).

---

## Запуск проекта
Установка зависимостей:
```bash
npm i
```

Запуск в dev-режиме:
```bash
npm run dev
```

Сборка:
```bash
npm run build
```

---

## Архитектура (Feature Sliced Design)

Проект организован по слоям FSD:

- `src/app/` — инициализация приложения, провайдеры, роутинг, store
- `src/pages/` — страницы (route-level)
- `src/widgets/` — крупные UI-блоки (layout приватной части)
- `src/features/` — фичи (auth, settings, products), публичные API через `index.ts`
- `src/entities/` — сущности домена (user, product), типы/селекторы, публичные API через `index.ts`
- `src/shared/` — переиспользуемые модули: api, ui, lib, i18n, styles

---

## Маршруты

Публичные:
- `/login` — авторизация
- `/register` — UI-заглушка регистрации

Приватные:
- `/` — Dashboard (заглушка)
- `/products` — список продуктов
- `/products/:id` — детальная страница продукта
- `/profile` — профиль пользователя
- `/settings` — настройки приложения
- `/logout` — выход
- `*` — 404

---

## Аутентификация (RTK Query)

API:
- `POST /auth/login`
- `GET /auth/me`

Логика:
- токен хранится в `localStorage` (`ECOM_ADMIN_TOKEN`) и в Redux (`auth slice`)
- после логина: сохраняем токен + пользователя в Redux
- при перезагрузке страницы: если токен есть → выполняется `initAuth()` (запрос `/auth/me`) и восстанавливается пользователь
- `ProtectedRoute` запрещает доступ к приватным роутам без токена
- `PublicOnlyRoute` редиректит авторизованного пользователя с `/login`/`/register` на `/`

---

## Каталог продуктов (RTK Query + query params)

API:
- `GET /products`
- `GET /products/{id}`
- `GET /products/search`

Список:
- пагинация через `limit`/`skip`
- поиск по названию через `q`
- параметры отражаются в URL (`?q=...&limit=...&skip=...`)
- обработаны состояния `loading` / `error` / `empty`

Детальная страница:
- загрузка по `id` из URL
- обработка невалидного `id`

---

## Настройки (Redux + localStorage persist)

Хранится в Redux (`settings slice`) и сохраняется в `localStorage` (`ECOM_ADMIN_SETTINGS`):
- тема: `light` / `dark`
- язык: `ru` / `en`
- размер страницы каталога: `8`/`12`/`16`/`24`

Применение:
- тема применяется через `document.documentElement.dataset.theme`
- язык применяется через `i18next.changeLanguage(language)`

---

## Интернационализация (i18n)

- языки: `ru`/`en`
- переводы: `src/shared/i18n/locales/ru.json`, `src/shared/i18n/locales/en.json`
- переключение без перезагрузки страницы
- ошибки API маппятся в ключи i18n через `shared/lib/apiError`
