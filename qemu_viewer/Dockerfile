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

EXPOSE 6080

CMD ["/bin/sh", "-c", "qemu-system-x86_64  -drive format=raw,file=/app/boot.bin -vnc :0 & novnc_server --vnc 127.0.0.1:5900 && fg"]
