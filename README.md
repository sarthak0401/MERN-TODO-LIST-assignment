<div align="center">
  <h1>End-to-End CI/CD pipeline for MERN web-app using Github Actions</h1>
</div>
End-to-End CI/CD pipeline to containerize an open-source MERN to-do web app using Docker and continuously deploy it on an AWS EC2 instance. The CI/CD pipeline, built with GitHub Actions, automatically builds and pushes Docker images based on the latest changes committed to the master branch of the GitHub repository. The app is then continuously deployed to the EC2 instance using the Docker Compose plugin and GitHub Actions.

- This project uses a open source MERN todo application : https://github.com/amuari/MERN-TODO-LIST 

- Install dependencies: [Docker](https://docs.docker.com/engine/install/), [Docker Compose plugin](https://docs.docker.com/compose/install/linux/)
  
- Clone the repository and run below commands to run MERN web app in your pc using docker compose.

- To build the docker images and running them on docker container : ```docker compose build --no-cache && docker compose up -d```

![Screenshot from 2024-09-12 00-22-28](https://github.com/user-attachments/assets/fa52f360-18cd-496b-a94a-53ff5c616855)

![Screenshot from 2024-09-12 00-22-50](https://github.com/user-attachments/assets/dc2d802c-2af2-41f6-ba88-f0f77474fdeb)

- We can access the web app using ```localhost``` because of nginx proxy 

![Screenshot from 2024-09-12 00-34-03](https://github.com/user-attachments/assets/43b53188-b4af-4ae6-b625-ace1dede66f3)

![Screenshot from 2024-09-12 00-34-26](https://github.com/user-attachments/assets/98e14b94-2bed-4987-ac8a-65e9f604a7e1)

![Screenshot from 2024-09-12 00-34-42](https://github.com/user-attachments/assets/029006eb-095a-4899-96f3-e650ccc41ae6)
![Screenshot from 2024-09-12 00-34-50](https://github.com/user-attachments/assets/6cc8ea6e-9afe-46f5-8bd7-31ff9dccf963)


- We can check the mongoDB database entries also using MongoDB Compass

![Screenshot from 2024-09-12 00-35-23](https://github.com/user-attachments/assets/ac56441d-a25b-4d9f-b43e-d062aaa8b9b8)

- NOTE: ```We are able to access the database at hostname : localhost, because in the docker compose file we have done port mapping for mongoDB container ‘27017:27017’ , it binds the port 27017 of localhost with the 27017 port of the mongoDB container. ```

- Now, pushing the docker images to docker hub

![Screenshot from 2024-09-12 21-22-46](https://github.com/user-attachments/assets/2bae29ea-5be0-46f6-8654-4e70324e4a75)


![Screenshot from 2024-09-12 21-23-25](https://github.com/user-attachments/assets/428b5fa1-96f2-46ea-a12d-03d12a8b81de)

![Screenshot from 2024-09-12 00-42-22](https://github.com/user-attachments/assets/482fbf07-204f-413c-83f9-2a9ea33abc09)

- We can see the docker images are successfully pushed to docker hub

![Screenshot from 2024-09-12 21-25-45](https://github.com/user-attachments/assets/271bc780-0381-4c92-8972-645cc6fad530)


- Created an EC2 instance

![Screenshot from 2024-09-12 00-45-13](https://github.com/user-attachments/assets/d36e2de3-33e6-4cb0-8321-98ad18fb22ac)

- Now we will place the docker compose file manually in EC2 instance by doing ssh, then later this file will be used by GitHub actions to run the modified docker images.
  
![Screenshot from 2024-09-12 01-02-35](https://github.com/user-attachments/assets/99cc8512-5161-4769-ab08-39d6ff543b19)

- We can access the MERN app using the public ip of the EC2 instance

NOTE: We need to set security group associated with the EC2 instance to allow inbound traffic from port 80, 22, 27017
   
![Screenshot from 2024-09-12 01-03-50](https://github.com/user-attachments/assets/f42b030a-7c88-4ee3-bf11-0f688c0b5333)
![Screenshot from 2024-09-12 01-04-21](https://github.com/user-attachments/assets/8f409ac0-662d-4b04-be39-77782bfca633)
![Screenshot from 2024-09-12 01-04-58](https://github.com/user-attachments/assets/855503a8-0462-4aa3-9c29-9f538edd2feb)

- Again we can check the mongoDB entry, using mongoDB url : ``` <ec2-instance-ip>:27017 ```
 
![Screenshot from 2024-09-12 01-05-59](https://github.com/user-attachments/assets/efdf7094-857f-4ece-8a08-37f487fb6219)


- Adding secrets to the GitHub repository to define the necessary secrets for GitHub Actions

![Screenshot from 2024-09-12 22-27-02](https://github.com/user-attachments/assets/e1bad906-245a-4755-9240-1c6049eda8fd)

- Creating an empty commit to the master branch to check if the GitHub actions build is running properly
  
![Screenshot from 2024-09-12 23-53-34](https://github.com/user-attachments/assets/3802bde7-1c18-4dc8-b3cf-55d0c0a73183)

- We can see that the build is triggered
  
![Screenshot from 2024-09-12 23-54-03](https://github.com/user-attachments/assets/45e70e2c-8460-4438-8229-31d45839b032)
![Screenshot from 2024-09-12 23-55-18](https://github.com/user-attachments/assets/9bf24736-4e9c-4c35-b71b-2e3ff7840241)

- Build successfully deployed the application on EC2 instance. 
- NOTE: ```The change in public IP of the AWS EC2 is due to reboot of the EC2 instance```

![Screenshot from 2024-09-12 23-55-58](https://github.com/user-attachments/assets/1d314bf4-be70-46ed-a580-e11dc102daa1)
![Screenshot from 2024-09-12 23-35-21](https://github.com/user-attachments/assets/ba4d7890-1cec-45e0-bb76-c339acfa96bd)
![Screenshot from 2024-09-12 23-57-32](https://github.com/user-attachments/assets/3ddf8bd7-7c2d-4f3d-9aa1-75d94ebc56ca)

- Now let's change the name of the application and push the changes to the master branch to check if the build is getting automatically triggered or not.
 
![Screenshot from 2024-09-12 23-59-27](https://github.com/user-attachments/assets/98c60854-17d7-4213-ba49-1c9f6ca4e175)
![Screenshot from 2024-09-13 00-00-01](https://github.com/user-attachments/assets/9778ee40-6efb-49da-9255-d29cbdf18e3d)
![Screenshot from 2024-09-13 00-00-48](https://github.com/user-attachments/assets/d5870aea-15cb-4929-bd14-23cc92cc4df8)

- Build is successfull and we can now see the name of the app is changed from "TODO App" to "Mern TODO App name change"

![Screenshot from 2024-09-13 00-01-47](https://github.com/user-attachments/assets/6c95da73-acb9-43b7-bdb9-4384998cde9a)
![Screenshot from 2024-09-13 00-05-06](https://github.com/user-attachments/assets/8593f77e-908e-4170-8803-ebb40c7834c0)
![Screenshot from 2024-09-13 00-06-48](https://github.com/user-attachments/assets/b43ca069-686b-40e2-9474-715acaea1869)

- We can verify the database entry also.

Docker images URL: 
- Frontend : https://hub.docker.com/repository/docker/sarthakb413/mern-todo-frontend
- Backend : https://hub.docker.com/repository/docker/sarthakb413/mern-todo-backend
- Nginx proxy : https://hub.docker.com/repository/docker/sarthakb413/mern-todo-nginx

This was the implementation of End-to-End CI/CD pipeline for MERN web application using GitHub actions
<br>
<br>

<div align="center">
<p>Thank you for checking out my project :) </p>
</div>

<div align="center">
  <a href="https://www.linkedin.com/in/sarthak-bokade-1a0321224/">
    <img alt="LinkedIn" src="https://img.shields.io/badge/Connect_with_me-blue?logo=linkedin&logoColor=white">
  </a>
</div>
