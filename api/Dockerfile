# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de configuração e dependências
COPY package.json yarn.lock ./

# Instale as dependências usando o Yarn
RUN yarn install

# Copie o código-fonte para o contêiner
COPY . .

# Expõe a porta 8800 (ou a porta que seu servidor Node.js está usando)
EXPOSE 8800

# Comando para iniciar o servidor
CMD ["yarn", "start"]
