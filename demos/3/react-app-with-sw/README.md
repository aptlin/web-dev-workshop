# Building a moodboard with React & Reactstrap ([live demo](https://base-moodie.netlify.app))

[![Netlify Status](https://api.netlify.com/api/v1/badges/f79f4284-8f15-4d58-a196-f772647b69b1/deploy-status)](https://app.netlify.com/sites/offline-moodie/deploys)

## Setup

1. Obtain a Giphy API key by following [the instructions](https://support.giphy.com/hc/en-us/articles/360020283431-Request-A-GIPHY-API-Key).
2. [Register an Auth0 app](https://auth0.com/docs/getting-started)
3. Rename [`.example.env`](./.example.env) to `.env` and paste the Giphy key together with the Auth0 ids (see the [example dotenv config](./.example.env) for details).
4. Run `npm install` and `npm start`.
5. Tweak the code and enjoy!

## Landing

![Moodie Landing](docs/landing.png)

## Search

![Moodie Search](docs/search.png)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
