FROM node:20

WORKDIR /app

COPY package*.json ./
COPY entrypoint.sh ./

RUN npm install 

RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*
    
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1
    