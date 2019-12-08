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
Content-Length: 18
Content-Type: application/json; charset=utf-8
Date: Sun, 08 Dec 2019 12:50:09 GMT

{
    "pong": true
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
Content-Length: 169
Content-Type: application/json; charset=utf-8
Date: Sun, 08 Dec 2019 14:08:11 GMT

{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiaVN4ODduejIifSwiZXhwaXJlcyI6IjE1NzU4MTQwOTEzNjAwIn0.2QCyoEJ3iYdkQxI54w6L2GpiWvhULSPBavo_NDR6HsY"
}
```

`GET /me`
this endpoint is used to get the user info from JWT token and to check the validity of the same, this will be used on the FE to verify whether the user is still logged in if it is returning after closing the browser.
```
-> % http get localhost:3001/me Authorization:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiaVN4ODduejIifSwiZXhwaXJlcyI6IjE1NzU4MTQwOTEzNjAwIn0.2QCyoEJ3iYdkQxI54w6L2GpiWvhULSPBavo_NDR6HsY
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 83
Content-Type: application/json; charset=utf-8
Date: Sun, 08 Dec 2019 14:12:07 GMT

{
    "id": "iSx87nz2",
    "maxStreams": 3,
    "plan": "basic",
    "username": "vince"
}
```

`GET /catalog/stream/:streamId`
this endpoint is used to get the stream url given a stream id, this will perform the check on whether the current logged in user can stream that resource or not. (For the scope of this test this will be a simple file url, which the FE app will mount inside an `<video>` tag).
If you are exceeding your stream quota:
```
-> % http get localhost:3001/catalog/stream/S0m3IDStR34m Authorization:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiaVN4ODduejIifSwiZXhwaXJlcyI6IjE1NzU4MTQwOTEzNjAwIn0.2QCyoEJ3iYdkQxI54w6L2GpiWvhULSPBavo_NDR6HsY
HTTP/1.1 403 Forbidden
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 94
Content-Type: application/json; charset=utf-8
Date: Sun, 08 Dec 2019 14:19:22 GMT

{
    "message": "Your current plan (basic) allows you only to stream 3 videos concurrently."
}
```

If you are not exceeding your quota but your stream id does not exist:
```
-> % http get localhost:3001/catalog/stream/NonExist1ng1d Authorization:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiaVN4ODduejIifSwiZXhwaXJlcyI6IjE1NzU4MTQwOTEzNjAwIn0.2QCyoEJ3iYdkQxI54w6L2GpiWvhULSPBavo_NDR6HsY
HTTP/1.1 404 Not Found
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 51
Content-Type: application/json; charset=utf-8
Date: Sun, 08 Dec 2019 14:27:21 GMT

{
    "message": "Stream not found 'NonExist1ng1d'"
}

```
if you are allow to stream it:
```
-> % http get localhost:3001/catalog/stream/37cx7fcvc Authorization:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiaVN4ODduejIifSwiZXhwaXJlcyI6IjE1NzU4MTQwOTEzNjAwIn0.2QCyoEJ3iYdkQxI54w6L2GpiWvhULSPBavo_NDR6HsY
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 47
Content-Type: application/json; charset=utf-8
Date: Sun, 08 Dec 2019 14:28:02 GMT

{
    "fileUrl": "https://some.com/fileurl.mp4"
}
```

### Frontend 
I decided to go with a simple SPA using Create-React-app for the frontend part.

#### How to
To run the FE part, after `npm install` you can just
```
npm start
```
and it will startup your default browser at :3000

You can at any point build the app and upload the assets to any static hosting and run them in your browser from there.
