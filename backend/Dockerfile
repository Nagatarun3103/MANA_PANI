# Stage 1: Build the application using Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN ls -la
RUN mvn clean install -DskipTests

# Stage 2: Create the final, lightweight image
FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/mana_pani-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
