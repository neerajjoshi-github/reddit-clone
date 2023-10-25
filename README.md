# Reddit Clone App

Welcome to the Reddit Clone App Repo! This is a web application built with Next.js and Firebase, designed to mimic the popular platform Reddit. It provides a platform for users to post, comment, create community and upvote/downvote content.

# Demo

Check out the live demo deployed on Vercel: [Reddit Clone](https://reddit-clone-weld-rho.vercel.app/)

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Technologies](#technologies)

# Features

The Reddit Clone App comes with the following features:

## Features

The Reddit Clone App comes with the following features:

- **User registration and authentication**: Users can create accounts and log in using their credentials.
- **Posting text, links, and images**: Users can create posts, including text-based content, links, and images.
- **Commenting on posts**: Users can engage in discussions by commenting on posts.
- **Upvoting and downvoting posts**: Users can express their opinions by upvoting or downvoting posts.
- **Searching for subreddits**: Users can search for specific subreddits.
- **User Profile**: Users can visit their profile page to get information about what they have posted, commented and communities they were invovled in.

## Screenshots

### Desktop View

![Desktop View Screenshot](/public/images/readme/1.png)

![Desktop View Screenshot](/public/images/readme/2.png)

![Desktop View Screenshot](/public/images/readme/3.png)

## Run Locally

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

```bash
  git clone https://github.com/neerajjoshi-github/reddit-clone.git
```

2. Go to the project directory

```bash
  cd reddit-clone
```

3. Install the project dependencies:

```bash
  npm install
```

4. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add your environment variables:

   You can find all these firebase env from your firebase console.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

5. Run the development server:

```bash
 npm run dev
```

6. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the app.

## Technologies

The Reddit Clone App is built using the following technologies:

- **Next.js**: A React framework for building server-rendered React applications.
- **Firebase**: A cloud-based platform for building web and mobile applications.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **React Hook Form**: A library for managing form state and validation.
- **Zustand**: A state management library for React.
- **TypeScript**: A typed superset of JavaScript that enhances development productivity and code quality.
- **...and more**: Various other libraries and tools, see `package.json` for a complete list.

## If there are any issues with the project, please let me know..

# Thank you for checking out this project.
