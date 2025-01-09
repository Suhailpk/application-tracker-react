# Base image for Node.js
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Copy the React project files
COPY . /app/

# Build the React app
RUN npm run build

# Serve the React app
FROM nginx:latest
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
