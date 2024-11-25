# Step 1: Use a Node.js base image
FROM node:20 as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React application for production
RUN npm run build

# Step 7: Use a lightweight web server to serve the built React app
FROM nginx:stable-alpine

# Step 8: Copy the build folder from the previous stage to the nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 to the host
EXPOSE 80

# Step 10: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
