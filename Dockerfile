FROM eclipse-temurin:21-jre
WORKDIR /app
COPY build/*.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
