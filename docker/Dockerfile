FROM debian:jessie

ENV DEBIAN_FRONTEND noninteractive

RUN echo "America/Sao_Paulo" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

### UPDATE DEBIAN
RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y && apt-get autoremove -y

### INSTALL DEBIAN DEPENDENCIES
RUN apt-get update &&  \
    apt-get install -y \
		curl               \
    gzip               \
		xz-utils           \
    locales            \
		netcat             \
    build-essential    \
    sudo               \
		htop               \
		git                \
    vim                \
    bash-completion    \
    libfontconfig1     \
    bzip2              \
    python-software-properties \
		--no-install-recommends

### CONFIGURE LOCALES
RUN echo "LANGUAGE=pt_BR.UTF-8" >> /etc/environment
RUN echo "LANG=pt_BR.UTF-8"     >> /etc/environment
RUN echo "LC_ALL=pt_BR.UTF-8"   >> /etc/environment
RUN locale-gen pt_BR.UTF-8
RUN dpkg-reconfigure locales

# gpg keys listed at https://github.com/nodejs/node
RUN set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 6.2.0

RUN curl -kSLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -kSLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt

RUN npm cache clear
RUN npm install bower -g
RUN npm cache clear

### APPLY BASH CONFIGURATION
COPY ./bash.bashrc /etc/bash.bashrc

### CREATE USER FOR PRODUCTION
RUN useradd -u 1000 -G users -d /conf --shell /bin/bash -m conf && \
    echo "secret\nsecret" | passwd conf

### APPLY ENTRYPOINT
COPY ./docker-entrypoint.sh /usr/local/docker-entrypoint.sh
RUN chmod +x /usr/local/docker-entrypoint.sh

USER conf
WORKDIR /conf

CMD [ "bash" ]
ENTRYPOINT ["/usr/local/docker-entrypoint.sh"]
