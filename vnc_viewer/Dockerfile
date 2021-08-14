FROM alpine:3.14

# Set the default display used by XVFB
ENV DISPLAY=:20      \
    TZ=Europe/Moscow 

RUN mkdir /app
WORKDIR /app
COPY run.sh .
RUN chmod +x run.sh

RUN \ 
    echo "http://dl-3.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
    apk add --no-cache --update \ 
    firefox-esr  \
    x11vnc       \
    xvfb         \
    git          \
    novnc

RUN echo "exec firefox" > .xinitrc && chmod +x .xinitrc

# NOTE: No need to access x11 VNC directly, use noVNC 
#EXPOSE 5900

EXPOSE 6080

CMD ["/bin/sh", "-c", "./run.sh"]
