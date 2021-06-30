# Water Gardens API Documentation

This is the front-end server for the Water Gardens project. This is a demo project for educational purposes under the Trent Global College (Singapore).

## Objectives: 
To build the front-end user interaction of the Water Gardens Gallery website which interfaces with the back-end server and database via RESTful API calls.

## Business Use Cases
### 1. A platform for hobbyists to feature their aquascaping aquariums
The Water Gardens Gallery features aquascaping aquariums and a repository of aquatic plants that are usually used for aquascaping. Hobbyists can submit their aquariums and the plants they used. 

### 2. Open platform for reviews and ratings
Other hobbyists or public can give ratings and feedback on these aquariums. 

### 3. Suppliers of Aquascaping plants, equipments and materials
A potential platform to sell related aquascaping products and services. Suppliers of aquatic plants can share information of the plants and see potential demands.  

### 4. Marketplace Potential
With payment and authentication as enhancements, the platform can be used by hobbyists and enthusiasts to engage services (e.g. commissioning of an aquarium by a professional aquascaper) and to buy/sell related aquascaping products.


## Main Technologies Used
### React
### Single Page Application
### Managed Components

# Testing

Test critical path
Add a plant
Add a garden
Edit a plant
Edit a garden
Delete a plant
Delete a garden

# Deployment
Front-end service will be deployed at Netlify linking to the GitHub repository. 
Domain will be custom

Gitpod starting of server and connecting to DB on npm:
```
npm install -g nodemon
nodemon index.js
```
Environment variables: 
```
MONGO_URI in .env
```
.gitignore contains:
```
.env
node_modules
```

Dependencies: 
```
yarn add express
yarn add cors
yarn add mongodb
yarn add axios
yarn add dotenv
```

## Background Credits
I am an aquascaping enthusiast and admires beautifully crafted and lovingly maintained aquascape aquariums. The following credits go to the below established industry experts that inspires the development of this demo website for my school's project. 

Contents are sourced from the following websites:
1. Aquatic Plants info from **All Ponds Solutions** - one of the UK’s leading online aquatics retailers. Their products and services are one of the most extensive ones that can be found online.
    https://www.allpondsolutions.co.uk/aquarium/plants/
2. Aquascaping Aquariums info from **Tropica Aquarium Plants A/S** - one of Europe and Denmark's leading supplier of aquatic plants. 
>Tropica Aquarium Plants rolled out its first plant in May 1970, 50 years ago. Created by a passionate hobbyist, Holger Windeløv and pushed into the future by a dedicated corporate group, JPS Clemens, Tropica Aquarium Plants now services a global community of aquarists. 
    https://tropica.com/en/inspiration/
3. Aquascaping process and equipments info from **ADA Nature Aquarium** - a premium retailer of aquascaping equipments and aquariums.  
>Founder Amano Takashi incorporated ecosystem and other elements found in nature to aquatic plant layout and established his own unique style called “Nature Aquarium”. In 1982, Amano founded Aqua Design Amano. The company attracted much attention for its aquarium equipment “Nature Aquarium Goods” featuring excellent quality and design. 
    https://www.adana.co.jp/en/contents/process/index.html


## Developed by: 
### Haryati Hassan
Singapore

GitHub: haryati75

June 2021
