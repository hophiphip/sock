FROM ubuntu:latest

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Moscow

RUN apt-get update && DEBIAN_FRONTEND="noninteractive" apt-get install -y firefox x11vnc xvfb git

RUN echo "exec firefox" > ~/.xinitrc && chmod +x ~/.xinitrc

RUN git clone https://github.com/novnc/noVNC

WORKDIR ./noVNC
COPY run.sh .

# NOTE: No need to access VNC directly, use noVNC 
#EXPOSE 5900

EXPOSE 6080

# NOTE: Left here for the reference
#CMD ["/bin/sh", "-c", "x11vnc -create -forever & ./utils/novnc_proxy --vnc 127.0.0.1:5900 && fg"]

CMD ["/bin/sh", "-c", "./run.sh"]

# NOTE: On hold till sockd statically compiled release
#CMD ["/bin/sh", "-c", "./sockd -address=0.0.0.0 -port=7070 -script=./run.sh"]
