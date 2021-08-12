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
    wget https://github.com/hophiphip/sockd/releases/download/v0.0.1-alpha/v0.0.1-alpha.sockd.amd64.zip && \
    unzip *.zip && \
    apk del buildDeps

# Remove everything from '/app' folder except 'sockd' binary & 'mount' folder
RUN find . ! '(' -name 'sockd' -o -name 'mount' ')' -type f -exec rm -f {} +

# Necessary to run sockd executable
#
# Reason:
#  # ldd sockd
#       /lib64/ld-linux-x86-64.so.2 (0x7f8fac100000)
#       libpthread.so.0 => /lib64/ld-linux-x86-64.so.2 (0x7f8fac100000)
#       libc.so.6 => /lib64/ld-linux-x86-64.so.2 (0x7f8fac100000)
#
# Explanation:
#   sockd was compiled against glibc. Alpine linux only provides uclibc.
# 
# Solution:
RUN apk add libc6-compat

### put app related commands here:
###

EXPOSE ${APP_PORT}

CMD [ "sh", "-c", "cp ../mount/exec.sh script.sh && ./sockd" ]
