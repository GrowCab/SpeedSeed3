FROM node:alpine

# Create a workdirectory in our container and copy all of our code to it.
WORKDIR /app
COPY . /app

# Setup inputs for arguments for environment variables.
ARG NODE_ENV
ARG PORT
ARG DATABASE_PROD
ARG DATABASE_TEST

# Set our environment variables from arguments.
ENV NODE_ENV ${NODE_ENV}
ENV PORT ${PORT}
ENV DATABASE_PROD ${DATABASE_PROD}
ENV DATABASE_TEST ${DATABASE_TEST}

# Install NPM dependencies for this project
RUN npm install --production

# Start API Backend.
CMD ["node", "app.js"]
