FROM node:16.13.2

WORKDIR /app

# Run npm install @angular/cli
RUN npm install -g @angular/cli

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng","serve","--host", "0.0.0.0", "--disable-host-check"]


