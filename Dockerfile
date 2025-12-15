# Define a imagem base
FROM nginx:alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/share/nginx/html

# Copia os arquivos da aplicação para o diretório padrão do nginx
COPY . /usr/share/nginx/html

# Expose a porta 80
EXPOSE 80

# Inicia o servidor nginx
CMD ["nginx", "-g", "daemon off;"]
