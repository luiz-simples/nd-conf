FROM node:9.4.0

ENV DEBIAN_FRONTEND noninteractive
ENV NODE_ENV development

COPY .bashrc /home/node/.bashrc

RUN set -ex && \
  echo "America/Sao_Paulo" > /etc/timezone && \
  dpkg-reconfigure -f noninteractive tzdata && \
  apt-get update && \
  apt-get upgrade -y && \
  apt-get dist-upgrade -y && \
  apt-get install -y \
    git \
    vim \
    ssh \
    curl \
    nano \
    sudo \
    htop \
    wget \
    make \
    bzip2 \
    rsync \
    netcat \
    vim-tiny \
    xz-utils \
    libreadline-dev \
    bash-completion \
    --no-install-recommends   && \
  apt-get autoremove -y       && \
  apt-get autoclean -y        && \
  apt-get clean -y            && \
  rm -r /var/lib/apt/lists/*  && \
  npm install -g node-gyp     && \
  passwd -d node              && \
  echo "node ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers && \
  chown node:node /home/node/.bashrc

USER node
WORKDIR /home/node
CMD ["/bin/bash"]
