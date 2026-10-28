# Serve static index.html via Nginx
FROM nginx:alpine

# Copy your single index.html file to Nginx's default public directory
COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]