# Use a imagem oficial do Node.js como base
FROM node:16

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de configuração e dependências
COPY package.json yarn.lock ./

# Instale as dependências usando o Yarn
RUN yarn install

# Copie o código-fonte para o contêiner
COPY . .

# Construa a aplicação de produção
RUN yarn build

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["yarn", "start"]
