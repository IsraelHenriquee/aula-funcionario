# Imagem base oficial do Node.js
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Instala as dependências (tente pnpm, yarn, depois npm)
RUN \
  if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  else npm install; \
  fi

# Copia o restante do projeto
COPY . .

# Build do projeto
RUN npm run build

# Expõe a porta padrão do Nuxt
EXPOSE 3000

# Comando para iniciar o servidor em produção
CMD ["node", ".output/server/index.mjs"]
