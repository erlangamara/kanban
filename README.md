# kanban

# Third Party

    Google OAUTH

# Server Documentation

### Dependencies

| Package Name  | Version   |
| ------------  | --------  |
| cors          | ^2.8.5    |
| dotenv        | ^8.2.0    |
| express       | 4.17.1    |
| googleapis    | ^39.2.0   |
| jsonwebtoken  | ^8.5.1    |
| pg            | ^7.18.1   |
| sequelize     | ^5.21.3   |
| mailgun-js    | ^5.21.5   |
| bcrypt    | ^4.0.1   |
| google-auth-library   | ^5.10.1  |

### Example .env

    DB_USERNAME = 
    DB_PASSWORD = 
    SECRET =
    CLIENT_ID =

## Default Port
    SERVER = https://damp-oasis-32768.herokuapp.com
    CLIENT = https://kanban-1584035163065.firebaseapp.com/

## Server
    Tools: NodeJS, Express, sequelize, postgresql

### USER
| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /user/register    | POST  | Menambahkan user baru            |
| /user/login       | POST  | Melakukan login dan mendaptkan token  |
| /user/googleSignin | POST  | Melakukan login dengan Google    |

### 1. POST / user / register

_Example Input (Request Body):_
```javascript
{
    "email": "example@expample.com",
    "password": "123"
}
```

_Response (201):_
```javascript
{
    "email": "example@expample.com",
    "password": "123",
    "updatedAt": "2020-03-07 13:47:28.607+07",
    "createdAt": "2020-03-07 13:47:28.607+07"
}
```

_Example Input (Request Body) :_

```javascript
{
    "email": ,
    "password": "123",	
}
```

_Response ERROR (400):_

```javascript
{
	"Validation error: Email is empty"
}
```

### 1. POST / user / login

_Example Input (Request Body):_
```javascript
{
    "email": "example@expample.com",
    "password": "123"
}
```

_Response (201):_
```javascript

    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiZXhwYW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE1ODM1NjQyODF9.jvh2CegZlsax09Cp_wcSiOed_84BUJTHJuC1IDAiTXs"

```

_Example Input (Request Body) :_

```javascript
{
    "email": "example@expample.com",
    "password": ,	
}
```

_Response ERROR (400):_

```javascript
{
	error: "wrong password"
}

```

### Todo
| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /tasks/    | POST  | Menambahkan task baru            |
| /tasks/       | GET  | Menampilkan list task  |
| /tasks/:id | GET  | Menampilkan list task berdasarkan id    |
| /tasks/:id | PUT  | Melakukan edit ke task    |
| /tasks/:id | DELETE  | Menghapus task dari list    |

### 1. POST /tasks

_Example Input (Request Headers):_
```javascript
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA

}
```

_Example Input (Request Body):_
```javascript
{
	"title" : "Belajar",
	"description" : "Vue Js"
}
```

_Response (201):_
```javascript
{
    "title": "Belajar",
    "description": "Vue Js",
    "category": "backlog",
    "due_date": "15-05-2020",
    "userId": 1
}

```

_Example Input:_
```javascript
{
	"title" : null,
	"description" : "Vue Js",
	"due_date" : "15-05-2020"
}
```

_Response ERROR (400):_

```javascript
{
	"Validation error: Title is empty"
}

```

### 2. GET /tasks

_Example Input (Request Headers):_
```javascript
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA

}
```

_Response (200):_
```javascript
{
    "title": "Belajar",
    "description": "Vue Js",
    "category": "backlog",
    "due_date": "15-05-2020",
    "userId": 1
}

```

_Example Input (Request Headers) :_

```javascript
{
    "token": 	
}
```

_Response ERROR (500):_

```javascript
{
	"jwt must be provided"
}

```

### 3. GET /tasks/:id

_Example Input (Request Headers):_
```javascript
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
```

_Response (201):_
```javascript
{
    "id": 1,
    "title": "Belajar",
    "description": "Vue Js",
    "category": "backlog",
    "due_date": "15-05-2020",
    "createdAt": "2020-03-07T07:15:12.149Z",
    "updatedAt": "2020-03-07T07:15:12.149Z",
    "userId": 1
}

```

_Example Input (Request Headers):_

```javascript
{
    "token":  	
}
```

_Response ERROR (404):_

```javascript
{
	"error not found"
}

```

### 4. PUT /tasks/:id

_Example Input (Request Headers):_
```javascript
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
```

_Example Input (Request Body):_
```javascript
{
	"title" : "Belajar",
	"description" : "Vue Js",
	"category" : "todo",
	"due_date" : "15-05-2020"
}
```

_Response (200):_
```javascript
{
    "title": "Belajar",
    "description": "Vue Js",
    "status": "todo",
    "due_date": "15-05-2020"
}

```

_Response ERROR (404):_

```javascript

	"error not found"

```

### 5. DELETE /tasks/:id

_Example Input (Request Headers):_
```javascript
{
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
```

_Response (200):_
```javascript
{
    "id": 1,
    "title": "Belajar",
    "description": "Vue Js",
    "status": "todo",
    "due_date": "15-05-2020",
    "createdAt": "2020-03-07T07:15:12.149Z",
    "updatedAt": "2020-03-07T07:20:48.109Z",
    "userId": 1
}

```

_Response ERROR (404):_

```javascript
{
	"error not found"
}

```