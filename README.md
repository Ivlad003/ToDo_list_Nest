## Description


```mermaid
---
title: Workflow
---
stateDiagram-v2
    [*] --> Register
    Register --> Login
    Login --> CRUD
    CRUD --> DB(local,memory)
    DB(local,memory) --> [*]
    
```

```mermaid
sequenceDiagram
    Note over Client,Server: User
    Client-->>Server: [POST] + [body] register
    activate Server
    Server->>Client: 200 statusCode

    Client-->>Server: [POST] + [body] login
    activate Server
    Server->>Client: access_token
    
    Note over Client,Server: TODOS
    Client-->>Server: [POST]+[token] + [body] add new todo
    activate Server
    Server->>Client: list fo todos
    deactivate Server
    
    Client-->>Server: [DELETE]+[token:(header:my_auth_head)]+[ID] remove new todo
    activate Server
    Server->>Client: list fo todos
    deactivate Server

```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

```curl
$ # GET /profile
$ curl http://localhost:3000/profile
$ # result -> {"statusCode":401,"message":"Unauthorized"}

$ # POST /auth/login
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
$ # result -> {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm... }

$ # GET /profile using access_token returned from previous step as bearer code
$ curl http://localhost:3000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
$ # result -> {"userId":1,"username":"john"}
```
