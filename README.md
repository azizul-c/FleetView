# 🚗 FleetView
![image](https://github.com/azizul-c/FleetView/assets/71241543/627ff8bc-9b96-4b32-b86a-3002f3b67379)

FleetView helps vehicle owners and fleet managers easily keep track of recalls affecting their vehicles.

## 📽️ Watch a short demo! (1m 40s)
### [🔗 Click here!](https://drive.google.com/file/d/1_OlJunzEjOtz6_HEssIdHmUPiAvA6ERL/view?usp=sharing)


## 🖼️ Gallery

### Desktop 

#### Home Page
![image](https://github.com/azizul-c/FleetView/assets/71241543/1681aa53-557e-4de2-a737-3e176e17756e)

#### View a Vehicle
![image](https://github.com/azizul-c/FleetView/assets/71241543/6f929d2e-36f0-4669-b2de-8d2eaad9fa73)

#### About Page
![image](https://github.com/azizul-c/FleetView/assets/71241543/f7449473-23fb-4864-a0eb-f8b6453d510c)

### iPhone 12 Pro
<img src="https://github.com/azizul-c/FleetView/assets/71241543/b947fb23-9f82-434b-a011-81f5113dd1e4" width="320px" />
<img src="https://github.com/azizul-c/FleetView/assets/71241543/7d7513b7-38fd-42ce-9dc0-38f2396f4d36" width="320px" />

## 👀 Features
- Vehicle addition and deletion
- Ability to toggle the availability of a vehicle
- View recall information for a given vehicle
- Fully responsive across various screen sizes

## 🧠 How it Works
Vehicle make logos are retrieved using the [Clearbit Logo API](https://clearbit.com/logo). Vehicle recall information, based on a vehicle's make, model, and year, are retrieved from the [U.S. National Highway Traffic Safety Administration (NHTSA)'s Recalls API](https://www.nhtsa.gov/nhtsa-datasets-and-apis).
The front-end is written in React. Dynamic routing is achieved through `react-router-dom`. The icons used throughout the app are part of the `react-icons` package. A fake REST API ([JSON Server](https://github.com/typicode/json-server)) is used as the back-end. 

## 🚀 How to Deploy
Clone this repository. In the root directory of this repo, run the following scripts.

### `npm run server`

Runs the mock back-end server.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## 🙈 Known Issues
- While the inputs to the form have a decent amount of validation (e.g. empty inputs aren't accepted, and inputs with leading / trailing spaces are trimmed), they're not foolproof right now. In the future, I'd like to validate whether a given make and model actually exist before adding the vehicle to the mock back-end.
- I haven't had a chance to test this on an iPhone myself, so it's possible that the text size on iPhone is too small. I'll be able to fix that after migrating to a real back-end.
- There was an attempt to make the mock back-end work with the app hosted on Vercel, but that didn't work. So ignore that oopsie :)
- I'm currently making the API call to NHTSA every time a vehicle is viewed. It would be much more efficient to make the API call as soon as the vehicle is added to the database, and the results of that API call would also be entered into the database.
- Some vehicle make logos returned by the Clearbit Logo API don't appear nicely (e.g. Mercedes-Benz, Subaru, Ford). For the problematic logos, it might be easiest to just store them in a folder in the repo and reference them from there.

## 🙋‍♂️ FAQ
- _Why do you ask for a vehicle's license plate and distance driven?_
    - My original goal with this app was to help fleet managers keep tabs on all their vehicles. Many fleets often consist of identical vehicles, so I felt that license plates were a reasonable differentiator. As for the distance driven, I intend to eventually add oil change warnings as a feature in the app. The user would be able to specify whether they'd like oil change reminders based on time intervals or on distance driven. 
 - _Why are license plates and distance driven mandatory inputs?_
    - They really shouldn't be, and eventually I'll probably make them optional. But for the time being, I wanted the View Vehicle page to be populated with content, so this was an easy way of doing it.
  
## ⏳ What's Next?
I'd like to migrate the application to an actual back-end, add authentication, host it somewhere, and resolve some of the issues mentioned above. But first... I need to deal with my own car's recalls 😵‍💫

