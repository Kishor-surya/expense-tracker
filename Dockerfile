# Stage 1: Build React
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Java
FROM maven:3.8-openjdk-17 AS backend-build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Copy React build to Spring static resources
COPY --from=frontend-build /app/frontend/build ./src/main/resources/static
RUN mvn clean package -DskipTests

# Stage 3: Run
FROM openjdk:17-jdk-slim
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
