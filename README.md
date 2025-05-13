# 🚗 FleetView
FleetView helps auto owners and fleet managers stay on top of recalls affecting their vehicles.

## ▶️ Try it out
https://fleetview.vercel.app/ 



## 🖼️ Gallery

### Desktop 

#### Home Page - User not logged in
![image](https://github.com/user-attachments/assets/31441fa6-9a28-4b26-bd83-c3b942057a09)


#### Home Page - User logged in
![image](https://github.com/user-attachments/assets/3311dfb6-5fb0-4336-b655-2fe29152d92e)


#### View a Vehicle
![image](https://github.com/user-attachments/assets/9c9c51aa-b106-46a8-b39b-7346aa5fbebe)
![image](https://github.com/user-attachments/assets/7b0b1003-5f0d-40f8-9a5d-2ce41f66a62a)

#### AI agent usage
![image](https://github.com/user-attachments/assets/c5dad821-5fc6-417c-8f2f-0ce14552f640)


#### About Page
![image](https://github.com/user-attachments/assets/f73d782d-6d34-457f-9137-180e4eb06c31)


## 👀 Features
- Separate user profiles via Google OAuth
- Vehicle addition and deletion
- Ability to toggle the availability of a vehicle
- View recall information for a given vehicle
- Logos for most vehicle makes
- AI agent with RAG that can answer questions about vehicles by searching through vehicle manuals

## 🧠 How it Works
- Vehicle make logos are retrieved using the [Logo.dev API](https://logo.dev).
- Vehicle recall information, based on a vehicle's make, model, and year, are retrieved from the [U.S. National Highway Traffic Safety Administration (NHTSA)'s Recalls API](https://www.nhtsa.gov/nhtsa-datasets-and-apis).
- The AI agent uses Retrieval Augmented Generation (RAG) to return information relevant to the given vehicle by consulting the vehicle's manual. Since this is currently a hobby project, to manage token usage costs, the agent only has access to the vehicle manual for the 2011 Toyota RAV4. A sample question that can be asked is, "How do I stop my windshield from fogging up in my 2011 Toyota RAV4?"

## ⚠️ Known Issues
- The AI agent might take some time to respond to the very first query. This is because I'm using the free tier for Render, so the API endpoint for the agent stops working after periods of inactivity, and it takes a few seconds to start back up.
- The AI agent currently doesn't have access to data pertaining to the user's fleet -- this is a feature I'm still working on. Since the agent has access to the 2011 Toyota RAV4's vehicle manual though, it can answer any question about that specific vehicle model. 

## 🛠️ Tech Stack
- Front-end: React, React Router, Material UI, tons of CSS, Google OAuth. Deployed on Vercel.
- Back-end: Python, Flask, Pinecone for the AI agent. Deployed on Render. 
- Database: Supabase

