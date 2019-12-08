# dazn-test
tech test for dazn

# Test
Build a service in your preferred language that exposes an API which can be
consumed from any client. This service must check how many video streams a
given user is watching and prevent a user watching more than 3 video streams
concurrently.

## My Approach
The challenge is quite interesting, and it is something I never done before. To start with I was thinking to implement something more like "IP related download restriction", like some download mirror website do, but then I realized that the "user" term was used. So I decided to implement a fake DAZN website with limited login capabilities, in order to identify the user browser side.

I decided to build a catalog on the frontend system that is going to use the same small backend to allow a user to browse and choose what to watch, the same backend will identify whether the user is already streaming something and block him if it is already going over a certain threshold/limit.

## Repository guide
I decided to go with a mono-repo approach, both FE and BE will be in the same repository in two different sub folders.
### Backend
I decided to use a small boilerplate I use for some of my projects, written in [micro](https://github.com/zeit/micro).
after running the install script `npm install`, to run it you can use either the docker-compose file.
```
docker-compose up -d
```

run it in dev mode locally (with auto reload on file change)
```
npm run dev
```

#### Endpoints
**ping**
`GET /ping`
this endpoint is needed just to check if the API is actually running correctly
```
-> % http get localhost:3001/ping 
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 53
Content-Type: application/json; charset=utf-8
Date: Sun, 08 Dec 2019 09:43:50 GMT

{
    "meta": {},
    "payload": {
        "pong": true
    }
}

```

**user**
`POST /login`
this endpoint is a fake login facility, it will be used to identify the user who is trying to stream the video using a JWT bearer token.
params: username, password (those are specified in the env file)
```
-> % http post localhost:3001/login <<< '{"username": "vince", "password":"password"}'
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 208
Content-Type: application/json; charset=utf-8
Date: Sun, 08 Dec 2019 09:41:41 GMT

{
    "meta": {},
    "payload": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidmluY2UifSwiZXhwaXJlcyI6IjE1NzU3OTgxMDEzNjAwIn0.LhTfBn1BIwhCSajupnwaxKtu76d04KPNy8xNmr1KUWA"
    }
}

```

`GET /me`
this endpoint is used to get the user info from JWT token and to check the validity of the same, this will be used on the FE to verify whether the user is still logged in if it is returning after closing the browser.
```
-> % http get localhost:3001/me Authorization:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidmluY2UifSwiZXhwaXJlcyI6IjE1NzU3OTgxMDEzNjAwIn0.LhTfBn1BIwhCSajupnwaxKtu76d04KPNy8xNmr1KUWA
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 82
Content-Type: application/json; charset=utf-8
Date: Sun, 08 Dec 2019 09:43:14 GMT

{
    "meta": {},
    "payload": {
        "user": {
            "username": "vince"
        }
    }
}

```

### Frontend 
tbd
