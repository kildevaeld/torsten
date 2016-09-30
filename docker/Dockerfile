FROM gliderlabs/alpine:latest

COPY torsten /usr/bin/torsten
COPY entrypoint.sh /entrypoint.sh

RUN chmod a+x /usr/bin/torsten /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]

CMD ["torsten"]