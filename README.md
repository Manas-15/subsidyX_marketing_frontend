<h1 align=center>SubsidyX Marketing Website</h1> 
<p align=center>SubsidyX is a fitech based product.</p>
<h2 align="center"> <a target="_blank" href="https://www.subsidyx.com" rel="nofollow">Visit Website</a></h2>

## Table of Contents
1. Getting Started
    1. Prerequisites
    2. Installation
2. Usage
3. Resources

## ⚙️ Prerequisites
Before you begin, ensure you have met the following requirements:

### 🔧Install Node JS
Make sure you have Node.js installed on your local machine. You can download it from https://nodejs.org/en/.


## 🖥️ Cloning and Running the Application in local

1. Clone this repository to your local machine using your preferred method (HTTPS or SSH):

```bash
git clone git@github.com:jinishisfintech/subsidyx_marketing_web.git
```

2. Navigate to the project directory:

```bash
cd subsidyx_marketing_web
```

3. Install the project dependencies using npm (Node Package Manager):

```bash
npm install
```

This will install all the required dependencies specified in the package.json file.


## 🔨 Usage

Now that you have the project set up, you can start using it. Here are some common commands and tasks you might find useful:
**Environment File Setup** : Go into the .env.development.local file and change your URL accordingly

```bash
NEXT_PUBLIC_REACT_APP_API_URL = https://subsidyx.com  
```

Please make sure all these file **.env.development.local**,**.env.local**,**.env.production.local**,**.env.test.local** changes with same URL.

**Development Mode** : Start the development server with hot-reloading to work on your project:

```bash
npm run dev
```

The Application Runs on **http://localhost:8000**

**Production Build** : Create a production-ready build of your application:

```bash
npm run build
```

This will create an optimized and minified build of your application in the build directory.

**Testing** :  Run tests for your application:

```bash
npm test
```

**Deployment** : Deploy your application to a hosting platform of your choice (e.g., Netlify, Vercel, GitHub Pages). Refer to their documentation for deployment instructions.


## Resources

**create-react-app** : The following link has all the commands that can be used with create-react-app
https://github.com/facebook/create-react-app

**ReactJS** : Refer to https://reactjs.org/ to understand the concepts of ReactJS

**React Bootstrap** : Refer to https://react-bootstrap.github.io/getting-started/introduction/ to understand how to use React Bootstrap


