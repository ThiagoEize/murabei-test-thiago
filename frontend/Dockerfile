# Use a imagem oficial do Node.js como base
FROM node:18-alpine AS base

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia apenas os arquivos essenciais para instalar as dependências
COPY package.json package-lock.json ./ 

# Instala as dependências do projeto
RUN npm install --production

# Copia o restante dos arquivos do projeto
COPY . .

# Constrói o aplicativo Next.js
RUN npm run build

# Etapa final para um contêiner mais leve
FROM node:18-alpine

# Define o diretório de trabalho para o contêiner final
WORKDIR /app

# Copia os arquivos necessários do estágio anterior
COPY --from=base /app /app

# Instala apenas dependências de produção
RUN npm install --production

# Exponha a porta padrão do Next.js (3000)
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "run", "start"]
