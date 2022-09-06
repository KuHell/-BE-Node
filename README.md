### 서버 요청과 응답 이해하기
> 클라이언트에서 서버로 요청(request)을 보내고, 서버에서는 요청의 내용을 읽고 처리한 뒤 클라이언트에 응답(response)을 보냅니다.

서버에서는 요청을 받는 부분과 응답을 보내는 부분이 있어야 합니다 요청과 응답은 이벤트 방식이라고 생각하면 됩니다. 클라이언트로부터 요청이 와씅ㄹ 때 어떤 작업을 수행할지 이벤트 리스너를 미리 등록해두어야 합니다.


```javascript
const http = require("http");

http
  .createServer((req, res) => {
	// 어떻게 응답할지 작성
  });

```

http 서버가 있어야 웹 브라우저의 요청을 처리할 수 있으므로 http 모듈을 사용했습니다. createServer 메서드를 사용했고 인수로 요청에 대한 콜백 함수를 넣을 수 있다. 요청이 들어올 때마다 매번 콜백 함수가 실핸 됩니다. 그렇기에 이 콜백 함수에 응답을 적으면 된다.

createServer의 콜백 부분에 req, res매개변수가 있습니다.
- req = request
- res = response

현재 요청에 대한 응답도 없고 서버와 연결하지도 않았기 때문에 실행해도 아무 일도 일어나지 않습니다.

``` javascript
const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello node</h1>");
    res.end("<p>hello</p>");
  })
  .listen(3000, () => {
    console.log("3000 port is running");
  });
```

`$ node 'js파일 이름'`로 실행 해주면

```node 
$node 'js파일 이름'
3000 port is running
```

위와 같은 문장이 나오면 성공!

웹 브라우저를 열어 `http://localhost:8080` 또는 `http://127.0.0.1:8080`으로 접속

![](https://velog.velcdn.com/images/itkdgus489/post/8c131569-b3ad-482a-8254-25b102f78c6b/image.png)

접속 성공

### res 객체에는 res.writeHead와 res.write, res.end 메서드가 있습니다.

#### res.writeHead
res.writeHead는 응답에 대한 정보를 기록하는 메서드입니다. 첫 번째 인수로 200(성공)을, 두 번째 인수로 응답에 대한 정보를 보내는데 콘텐츠의 형식이 HTML임을 알리고 있습니다. 한글 표시를 위해 charset을 utf-8로 지정 이 정보가 기록되는 부분을 헤더(Header)라고 부릅니다.

#### res.write
res.write 메서드의 첫 번째 인수는 클라이언트로 보낼 데이터입니다. HTML 모양의 문자열을 보냈지만 버퍼를 보낼 수도 있습니다. 여러 번 호출해서 데이터를 여러 개 보내도 됩니다. 데이터가 기록되는 부분을 본문(Body)이라고 부릅니다.

#### res.end
res.end는 응답을 종료하는 메서드입니다. 만약 인수가 있다면 그 데이터도 클라이언트로 보내고 응답을 종료합니다. 종료하면서 `hello`라는 문자열을 클라이언트로 보낸 후 응답이 종료된 것입니다.

#### listen
listen 메서드에 콜백 함수를 넣는 대신, 서버에 listening이벤트 리스너를 붙여도 됩니다. error이벤트 리스너도 추가 해봤습니다.

``` javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<h1>Hello node</h1>");
  res.end("<p>hello</p>");
});

server.listen(3000);

server.on("listening", () => {
  console.log("3000 port is running");
});

server.on("error", (error) => {
  console.log("error:", error);
});
```

> 서버의 소스 코드를 변경할 때 서버가 자동으로 변경 사항을 반영하지 않습니다. 서버를 종료 후 다시 실행해야 합니다.

한 번에 여러 서버를 실행할 수도 있습니다. createServer를 원하는 만큼 호출하면 됩니다.

``` javascript
const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello node</h1>");
    res.end("<p>go Server 09 04</p>");
  })

  .listen(3000, () => {
    console.log("3000 port is running");
  });

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello node</h1>");
    res.end("<p>go Server 09 04</p>");
  })

  .listen(3001, () => {
    console.log("3001 port is running");
  });

```

![](https://velog.velcdn.com/images/itkdgus489/post/d51c7524-a1ee-458b-8daf-b651c24c6ee1/image.png)

> 이때 포트 번호가 달라야 한다는 점에 주의하세요.

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Node.js 웹 서버</title>
</head>
<body>
  <h1>Node.js 웹 서버</h1>
  <p>준비</p>
</body>
</html>
```
HTML

``` javascript
const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {
    try {
      const data = await fs.readFile("./index.html");
      res.writeHead(200, { "Content-Type": "text/html; charset-utf-8" });
      res.end(data);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(3000, () => {
    console.log("3000 port is running");
  });

```
Js

![](https://velog.velcdn.com/images/itkdgus489/post/2d2f7944-d436-42d3-9795-a89cb31fd990/image.png)

요청이 들어오면 먼저 fs 모듈로 HTML 파일을 읽습니다. data 변수에 저장된 버퍼를 그대로 클라이언트에 보내면 됩니다.

> 요청 처리 과정 중에 에러가 발생했다고 해서 응답을 보내지 않으면 안 됩니다. 요청이 성공했든 실패했든 응답을 클라이언트로 보내서 요청이 마무리되었음을 알려야 합니다. 클라이언트는 서버로부터 응답이 오길 하염없이 기다리다가 일정 시간 후 timeout(시간초과)처리합니다.


