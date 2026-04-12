FROM node:18-alpine
ARG TEST_ARG
RUN node -e "console.log('TEST_ARG is: ' + process.env.TEST_ARG);"
