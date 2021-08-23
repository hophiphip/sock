FROM alpine:3.14

# Set the default display used by XVFB
ENV DISPLAY=:20      \
    TZ=Europe/Moscow 

RUN mkdir /app
WORKDIR /app
COPY boot.bin .

RUN \ 
    echo "http://dl-3.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
    apk add --no-cache --update \ 
    qemu-system-x86_64          \
    x11vnc                      \
    xvfb                        \
    git                         \
    novnc

RUN echo "exec qemu-system-x86_64 -drive format=raw,file=boot.bin" > .xinitrc && chmod +x .xinitrc

# NOTE: No need to access x11 VNC directly, use noVNC 
#EXPOSE 5900

EXPOSE 6080

CMD ["/bin/sh", "-c", "x11vnc -create -forever & novnc_server --vnc 127.0.0.1:5900 && fg"]
