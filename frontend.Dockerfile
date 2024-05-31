FROM node:18-alpine

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install

COPY public/ /app/public/
COPY src/ /app/src/
COPY index.html /app/
COPY postcss.config.js /app/
COPY tailwind.config.js /app/
COPY tsconfig.json /app/
COPY tsconfig.node.json /app/
COPY vite.config.ts /app/

EXPOSE 3000

# Start the frontend application
CMD ["npm", "run", "dev"]
