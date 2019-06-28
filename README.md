# "Students" RESTful API App using MongoDB

This app is a CRUD editor for a list of students and some basic information about them, including name, age, photo, and bio. The data are stored in mongoDB.

View live webpage [here](https://annacate.github.io/jrs-mongo-rest/web/index.html).

## Features

The app allows the user to view, add, edit, and delete students from the database.

## Instructions for use

Clone the repo into a local directory of your choice:

```
git clone https://github.com/AnnaCate/jrs-mongo-rest.git
```

`cd` into the `api` directory:

```
cd api
```

Use `npm` to install the necessary modules:

```
npm install
```

Start the server:

```
npm run dev
```

You should now be able to use the app by opening the `web/index.html` file in your favorite browser (which is hopefully Chrome).

If you want to view your raw data, go to `localhost:8000/students`
