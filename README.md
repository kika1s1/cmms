# CSEC DEV CMMS
## Project Description

The CSEC DEV Club Member Management System is designed to streamline and enhance the management of club activities and membership. This comprehensive platform offers a variety of features aimed at improving the organization and execution of events, as well as providing robust administrative tools for managing members and events. The system includes the following key features:

### User Registration
Users can create an account within the system by providing their relevant information such as name, email address, and membership details. The registration process includes password creation and validation to ensure secure access.

### Full-Featured Authentication
Once registered, users can log in using their credentials (email address and password). The system authenticates the user's credentials before granting access to personalized features and information.

### Contact Event Manager
Users have the ability to contact the event manager directly through the platform for any inquiries or support related to club events. This feature ensures smooth communication and efficient event management.

### Top New Event Carousel
A dynamic carousel displays the top new events, allowing members to stay updated on upcoming activities. This feature enhances visibility and engagement with club events.

### Create, Edit, and Delete Event
Event organizers can create new events, edit existing ones, or delete events that are no longer relevant. This flexibility ensures that event information is always current and accurate.

### Event Search Feature
The system includes a powerful search feature that allows users to find events quickly and easily. Members can search for events based on various criteria, ensuring they can find relevant activities without hassle.

### Admin Event Management
Administrators have access to advanced event management tools. They can oversee all events, manage event details, and ensure that everything runs smoothly. This feature is crucial for maintaining the quality and organization of club events.

### Admin User Management
Admin users have the ability to manage member information, including adding new members, updating details, and removing inactive members. This feature ensures that the membership database is always accurate and up-to-date.

### Admin Event Details Page
A dedicated page for administrators to view detailed information about each event, including participant lists, schedules, and other relevant data. This feature provides admins with a comprehensive overview of each event.

### Profile Edit and Delete
Users can edit their profile information, including updating contact details and other personal information. Additionally, users can delete their profiles if they choose to leave the club. This feature ensures that user data is always current and manageable.


<img src="https://github.com/kika1s1/cmms/blob/main/client/images/screen.png">

<!-- toc -->

<!-- tocstop -->



## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```

PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'

```

### Install Dependencies (client & server)

```
npm install
cd client
npm install
```

### Run

```

# Run backend (:3000) & client (:517)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd client
npm run build
```

Sample User Logins

admin@email.com (Admin)
12345678

#### Setting up linting

By default CRA outputs linting from eslint to your terminal and browser console.
To get Vite to ouput linting to the terminal you need to add a [plugin](https://www.npmjs.com/package/vite-plugin-eslint) as a
development dependency...

```bash
npm i -D vite-plugin-eslint

```

Then add the plugin to your **vite.config.js**

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import the plugin
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      // setup the plugin
      cache: false,
      include: ["./src/**/*.js", "./src/**/*.jsx"],
      exclude: [],
    }),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
```

By default the eslint config that comes with a Vite React project treats some
rules from React as errors which will break your app if you are following Brad exactly.
You can change those rules to give a warning instead of an error by modifying
the **eslintrc.cjs** that came with your Vite project.

```js
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    // turn this one off
    "react/prop-types": "off",
    // change these errors to warnings
    "react-refresh/only-export-components": "warn",
    "no-unused-vars": "warn",
  },
};
```

#### Vite outputs the build to /dist

Create React App by default ouputs the build to a **/build** directory and this is
what we serve from our backend in production.  
Vite by default outputs the build to to a **/dist** directory so we need to make
some adjustments to our [server/index.js](/server/index.js)
Change...

#### Vite has a different script to run the dev server

In a CRA project you run `npm start` to run the development server, in Vite you
start the development server with `npm run dev`  
If you are using the **dev** script in your root pacakge.json to run the project
using concurrently, then you will also need to change your root package.json
scripts from...

```json
    "client": "npm start --prefix client",
```

Or you can if you wish change the frontend/package.json scripts to use `npm
start`...

```json
    "start": "vite",
```

#### A final note:

Vite requires you to name React component files using the `.jsx` file
type, so you won't be able to use `.js` for your components. The entry point to
your app will be in `main.jsx` instead of `index.js`

And that's it! You should be good to go with the course using Vite.

---

## DEPloyed at

`Project Link` - [Club management ](https://csec-astu.onrender.com/)

## License

The MIT License

Copyright (c) 2023 tamirat kebede https://kika1s1.github.io/tamirat/

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
