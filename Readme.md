This project was created to demonstrate how to crate a reactJS application from scratch.

the complete article can be found here

https://betterprogramming.pub/complete-guideline-to-creating-a-modern-react-app-with-typescript-from-scratch-cebbb5817d8

# ENV
Node ver: 14.17.0
# use yarn
npm i -g yarn

# To run the project

go into the root folder

```
cd react-typescript-template-from-scratch
```

Then install the dependencies

```
yarn install
```

and run the project

```
yarn start
```
# To run docker
docker build -t <image_name> .
docker images copy the IMAGE ID for <image_name>
docker run <IMAGE_ID>
to get docker ip address docker ps and grab CONTAINER_ID. docker inspect <CONTAINER_ID> | grep IPAddress
To remove image, docker rmi -f <IMAGE_ID>

# with docker compose
- docker-compose up
# with docker compose next time
- docker-compose up --build