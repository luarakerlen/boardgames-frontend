FROM nginx:latest

# remove config default
RUN rm -rf /usr/share/nginx/html/*

# copia SOMENTE os arquivos estáticos
COPY ./ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]