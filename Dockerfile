# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.11.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV MONGO_URI="mongodb+srv://root:toor@aditya.qvnrr.mongodb.net/mobiiwrap?retryWrites=true&w=majority&appName=aditya"
ENV JWT_SECRET="c4168259-739f-4fc5-ba88-0d3d805ae51a"
ENV RZP_KEY_ID="rzp_live_2JgBheIjOqSw6k"
ENV RZP_KEY_SECRET="DMP6n7S5pi9dXnSVl9JdAwzL"
ENV RZP_TEST_KEY_ID="rzp_test_9X3Qpir7NtIqds"
ENV RZP_TEST_KEY_SECRET="zzKCVtYdRzsryXnVGFiAxFRe"

# Install pnpm
ARG PNPM_VERSION=9.12.3
RUN npm install -g pnpm@$PNPM_VERSION


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "pnpm", "run", "start" ]
