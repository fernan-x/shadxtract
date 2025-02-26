ShadXtract is an AI-powered, no-code web scraping tool that lets you visually design and automate data extraction workflows. With an intuitive drag-and-drop interface, you can collect and structure web data effortlessly—no coding required. Built for efficiency, powered by AI.

## Launching the app

### Docker

```bash
docker build -t shadxtract .
docker run -p 3000:3000 shadxtract
```

### Without Docker

```bash
pnpm install
pnpm prisma generate && pnpm prisma migrate deploy
```

```bash
pnpm dev
```