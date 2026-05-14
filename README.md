# Переходник

Одностраничный минималистичный link hub под GitHub Pages. Контент редактируется через один файл, а карточки ссылок автоматически получают стиль по домену: иконку, акцент и компактный формат карточки.

## Что уже заложено

- Один файл контента: `src/content/site.json`
- Автоматическое определение платформы по ссылке
- Отдельный компактный Telegram-блок для нескольких Telegram-ссылок
- Компактная сетка без лишних секций и длинного лендингового скролла на desktop
- Спокойный серый dark UI на базе `#1d1d1d` с мягкой подсветкой и сдержанным hover/tap feedback
- Готовый workflow деплоя в GitHub Pages: `.github/workflows/deploy.yml`

## Как редактировать

1. Открой `src/content/site.json`.
2. Замени имя, фамилию, био, аватар и ссылки на свои.
3. Если нужно, замени `public/avatar-placeholder.svg` на свою картинку, сохранив путь или обновив поле `avatar`.
4. Для локальных файлов из `public` можешь писать путь как `avatar-placeholder.svg` или `/avatar-placeholder.svg` - проект сам подставит корректный `base` для GitHub Pages.
5. Для новой ссылки достаточно вставить `label`, `description` и `url`. Протокол `https://` можно не писать, он будет добавлен автоматически.
6. Если хочется переопределить размер карточки, используй `variant`: `compact`, `square`, `wide` или `tall`.
7. Верхний блок теперь intentionally короткий: аватар, имя, одна короткая строка роли и несколько слов о себе.
8. Для Telegram-ссылок можно дополнительно указать `kind` (`chat`, `channel`, `news`, `support`, `reserve`) и `tag`, чтобы карточки внутри Telegram-блока отличались быстрее.
9. Если ссылку нужно временно скрыть, добавь `hidden: true` - она останется в конфиге, но пропадет со страницы.

## Поддерживаемые платформы из коробки

- Telegram
- Instagram
- TikTok
- YouTube
- GitHub
- LinkedIn
- Discord
- Patreon
- Figma
- Spotify
- Notion
- Substack
- Twitch
- X / Twitter
- Любой другой домен через generic fallback

## Локальный запуск

Требуется Node.js 20+ и npm.

```bash
npm install
npm run dev
```

Для production-сборки:

```bash
npm run build
npm run preview
```

## GitHub Pages

- Для `username.github.io` сайт будет собираться с `base: /`
- Для project pages (`username.github.io/repository-name`) `vite.config.ts` автоматически подставит `base` из `GITHUB_REPOSITORY`
- После первого пуша в GitHub зайди в `Settings -> Pages` и выбери `GitHub Actions`
- Если у тебя обычный аккаунт GitHub Free и без платного тарифа, делай репозиторий публичным, чтобы Pages работал без ограничений
- Workflow деплоя использует `npm ci`, поэтому `package-lock.json` уже должен ехать в репозиторий вместе с кодом

## Что можно развить дальше

- Добавить CMS поверх GitHub repo
- Добавить кастомные медиа для отдельных карточек
- Подключить аналитику или edge-backend для внешних preview

## Перед публикацией

- Проверь `src/content/site.json` и замени все плейсхолдеры на свои данные
- Если меняешь аватар или community icons, добавляй файлы в `public/`, чтобы они попали в сборку GitHub Pages
- Перед пушем полезно локально прогнать `npm run check` и `npm run build`
