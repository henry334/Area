FROM node:18-alpine

WORKDIR /app

COPY . .

USER root

RUN rm -fr node_modules
RUN mkdir -p /usr/src/app/output/
RUN cp ./mobile/mobile.apk /usr/src/app/output/mobile.apk
RUN npm install --force
RUN npm install -g expo-cli
RUN npm i @expo/ngrok@^4.1.0

RUN expo login -u airaz -p Xobpyr-zugso0-dybgab

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
# RUN npm install -g eas-cli
# RUN npx expo install react-native-web@~0.19.6 react-dom@17.0.1 @expo/webpack-config@^19.0.0

# RUN eas build --platform android --local --profile production

# CMD ["npm", "run", "build"]
CMD ["expo", "start", "--tunnel"]