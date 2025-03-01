FROM node:18-alpine AS base

WORKDIR /app

# Install pnpm
FROM base AS deps
RUN apk add --no-cache libc6-compat curl
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the application
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Accept build arguments
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL

# Set them as environment variables
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_SIGN_UP_URL

RUN corepack enable && pnpm exec prisma generate && pnpm build

# Run the production build
FROM base AS runner
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

RUN corepack enable

EXPOSE 3000
CMD ["pnpm", "start"]
