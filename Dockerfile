FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

RUN mkdir -p /data/uploads/news
ENV UPLOAD_DIR=/data/uploads/news
VOLUME ["/data/uploads"]

EXPOSE 3000
CMD ["npm", "start"]
