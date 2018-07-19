FROM node:alpine

# Create a workdirectory in our container and copy all of our code to it.
WORKDIR /app
COPY . /app

# Setup inputs for arguments for environment variables.
ARG NODE_ENV
ARG PORT

# Set our environment variables from arguments.
ENV NODE_ENV ${NODE_ENV}
ENV PORT ${PORT}

# Install NPM dependencies for this project
RUN npm install --production

# Start GUI frontend/React project.
CMD ["npm", "start"]
