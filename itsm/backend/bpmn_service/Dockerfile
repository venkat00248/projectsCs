# Use a base image with Java
FROM adoptopenjdk:11-jre-hotspot

# Set the working directory
WORKDIR /camunda

# apt install wget
RUN apt update && apt install wget



# Download and extract Camunda BPM Run
# RUN curl -O https://downloads.camunda.cloud/release/camunda-bpm/run/7.16/camunda-bpm-run-7.16.0.tar.gz \
RUN wget https://downloads.camunda.cloud/release/camunda-bpm/run/7.16/camunda-bpm-run-7.16.0.tar.gz
RUN tar -xzf camunda-bpm-run-7.16.0.tar.gz \
    && rm camunda-bpm-run-7.16.0.tar.gz

# Set the environment variables
ENV CAMUNDA_VERSION=7.16.0
ENV CAMUNDA_HOME=/camunda/camunda-bpm-run-$CAMUNDA_VERSION
ENV PATH=$CAMUNDA_HOME/bin:$PATH

# Expose the necessary ports
EXPOSE 8080 8000

# Set the command to run Camunda BPM Run
CMD ["./start.sh"]
