FROM node:20


USER node


RUN git clone https://github.com/EMMYHENZ-TECH.git home/node/blue


WORKDIR /home/node/henz


RUN chmod -R 777 /home/node/henz/


RUN yarn install && yarn add http


COPY server.js .


COPY start.sh .


CMD ["bash","start.sh" ]
