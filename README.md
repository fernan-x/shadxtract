ShadXtract is an AI-powered, no-code web scraping tool that lets you visually design and automate data extraction workflows. With an intuitive drag-and-drop interface, you can collect and structure web data effortlessly—no coding required. Built for efficiency, powered by AI.

## Launching the app

### Docker

```bash
cp .env.example .env.docker
docker-compose --env-file .env.docker up -d --build
```

### Without Docker

```bash
pnpm install
cp .env.example .env
pnpm prisma generate && pnpm prisma migrate deploy
```

```bash
pnpm dev
```
