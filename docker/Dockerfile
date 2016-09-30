FROM gliderlabs/alpine:latest

RUN apk add --no-cache ca-certificates

COPY torsten /usr/bin/
COPY entrypoint.sh /entrypoint.sh

RUN chmod a+x /usr/bin/torsten /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]

CMD ["torsten"]
