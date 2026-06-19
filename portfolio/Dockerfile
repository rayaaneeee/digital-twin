# HuggingFace Space — AI Rayane Portfolio (Next.js)
FROM node:20-slim

WORKDIR /app

# Install system deps for native modules
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# Use install (not ci) for better compatibility
RUN npm install

COPY . .

# Remove old conflicting config
RUN rm -f next.config.mjs

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

ENV NODE_ENV=production
ENV PORT=7860

EXPOSE 7860

CMD ["npm", "start"]
