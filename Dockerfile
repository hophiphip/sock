FROM alpine:3.14

ENV APP_PORT 8080

RUN mkdir /app
RUN mkdir /mount
WORKDIR /app

# Removes all dependencies once finished
RUN apk add --no-cache --update --virtual buildDeps \ 
    ca-certificates \
    wget            \
    unzip &&        \
    wget http://github.com/joewalnes/websocketd/releases/download/v0.3.0/websocketd-0.3.0-linux_amd64.zip && \
    unzip websocketd*.zip && \
    apk del buildDeps

# Remove everything from '/app' folder except 'websocketd' binary & 'mount' folder
RUN find . ! '(' -name 'websocketd' -o -name 'mount' ')' -type f -exec rm -f {} +

# Necessary to run websocketd executable
#
# Reason:
#  # ldd websocketd
#       /lib64/ld-linux-x86-64.so.2 (0x7f8fac100000)
#       libpthread.so.0 => /lib64/ld-linux-x86-64.so.2 (0x7f8fac100000)
#       libc.so.6 => /lib64/ld-linux-x86-64.so.2 (0x7f8fac100000)
#
# Explanation:
#   Websocketd was compiled agains glibc. Alpine linux only provides uclibc.
# 
# Solution:
RUN apk add libc6-compat

### put app related commands here:
###

EXPOSE ${APP_PORT}

CMD [ "sh", "-c", "./websocketd --port=$APP_PORT --address=0.0.0.0 ../mount/exec.sh" ]
