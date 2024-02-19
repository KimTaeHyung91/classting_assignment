# API Document

---

## School

### 학교 페이지 생성<br>

Method: POST

```http request
http://localhost:3001/api/v1/school/page
```

Body<br>

| key        | type   | description | required/optional | 비고 |
|------------|--------|-------------|-------------------|----|
| schoolName | string | 학교 이름       | required          |    |
| location   | string | 학교 지역       | required          |    |

```json
{
  "schoolName": "Test",
  "location": "Seoul"
}
```

Response<br>

| key             | type   | description                                        |
|-----------------|--------|----------------------------------------------------|
| schoolPageToken | string | school page token, 조회, 수정, 삭제 요청 시 해당 토큰값으로 요청합니다. |

```json
{
  "data": {
    "schoolPageToken": "47129bb3118f8bf9a17508bf3e6648dd"
  },
  "message": null,
  "errorCode": null,
  "result": "SUCCESS"
}
```

<br>
<br>

### 학교 소식 생성

Method: POST

```http request
http://localhost:3001/api/v1/school/news
```

Body<br>

| key             | type   | description       | required/optional | 비고 |
|-----------------|--------|-------------------|-------------------|----|
| schoolPageToken | string | school page token | required          |    |
| title           | string | 제목                | required          |    |
| content         | string | 내용                | required          |    |

```json
{
  "schoolPageToken": "47129bb3118f8bf9a17508bf3e6648dd",
  "title": "title",
  "content": "content"
}
```

Response<br>

| key             | type   | description                                        |
|-----------------|--------|----------------------------------------------------|
| schoolNewsToken | string | school news token, 조회, 수정, 삭제 요청 시 해당 토큰값으로 요청합니다. |

```json
{
  "data": {
    "schoolNewsToken": "4106e0c3f1252a26a914248df8560dc7"
  },
  "message": null,
  "errorCode": null,
  "result": "SUCCESS"
}
```

<br>
<br>

### 학교 소식 수정

Method: PUT

```http request
http://localhost:3001/api/v1/school/news
```

Body<br>

| key             | type   | description       | required/optional | 비고 |
|-----------------|--------|-------------------|-------------------|----|
| schoolNewsToken | string | school page token | required          |    |
| title           | string | 제목                | optional          |    |
| content         | string | 내용                | optional          |    |

```json
{
  "schoolNewsToken": "4106e0c3f1252a26a914248df8560dc7",
  "title": "change title"
}
```

Response<br>

| key             | type   | description                                        |
|-----------------|--------|----------------------------------------------------|
| schoolNewsToken | string | school news token, 조회, 수정, 삭제 요청 시 해당 토큰값으로 요청합니다. |

```json
{
  "data": {
    "schoolNewsToken": "4106e0c3f1252a26a914248df8560dc7"
  },
  "message": null,
  "errorCode": null,
  "result": "SUCCESS"
}
```

<br>
<br>

### 학교 소식 삭제

Method: DELETE

```http request
http://localhost:3001/api/v1/school/news
```

Body<br>

| key             | type   | description       | required/optional | 비고 |
|-----------------|--------|-------------------|-------------------|----|
| schoolNewsToken | string | school page token | required          |    |

```json
{
  "schoolNewsToken": "4106e0c3f1252a26a914248df8560dc7"
}
```

Response<br>

```json
{
  "data": null,
  "message": null,
  "errorCode": null,
  "result": "SUCCESS"
}
```

---

## Student

### 학생 등록

test student token<br>
43a040cc07543a8c87cc6b31c5953530<br>
4c913002a0efdc17baaa3de32fe4be43<br>


과제에는 없지만, 학생 등록 후 이후 과제에 대한 내용을 진행하기위해 제작했습니다. 테스트를 위해 해당 요청을 해도 되고, 위 작성된 토큰으로 테스트 진행하셔도 됩니다. <br>
제가 미리 테스트 데이터는 생성해놨습니다.<br>

Method: POST

```http request
http://localhost:3001/api/v1/student
```

Body<br>

| key              | type   | description | required/optional | 비고 |
|------------------|--------|-------------|-------------------|----|
| studentName      | string | 학생 이름       | required          |    |
| age              | number | 학생 나이       | required          |    |
| city             | string | 지역          | optional          |    |
| roadAddress      | string | 도로명 주소      | optional          |    |
| numberingAddress | string | 지번 주소       | optional          |    |

```json
{
  "studentName": "홍길동",
  "age": 17
}
```

Response<br>

```json
{
  "data": {
    "studentToken": "4c913002a0efdc17baaa3de32fe4be43"
  },
  "message": null,
  "errorCode": null,
  "result": "SUCCESS"
}
```

### 학교 페이지 구독

Method: POST

```http request
http://localhost:3001/api/v1/student/school-page
```

Body<br>

| key             | type   | description       | required/optional | 비고 |
|-----------------|--------|-------------------|-------------------|----|
| schoolPageToken | string | school page token | required          |    |
| studentToken    | string | student token     | required          |    |

```json
{
  "schoolPageToken": "491bd8bd0a30463dbd146abd2cc215e8",
  "studentToken": "4c913002a0efdc17baaa3de32fe4be43"
}
```

Response<br>

```json
{
  "data": null,
  "message": null,
  "errorCode": null,
  "result": "SUCCESS"
}
```

### 구독 중인 학교 페이지 목록

Method: GET

```http request
http://localhost:3001/api/v1/student/{studentToken}
```

Query Parameter<br>

| key      | type   | description | required/optional | 비고          |
|----------|--------|-------------|-------------------|-------------|
| pageNo   | number | 페이지 넘버      | optional          | default: 1  |
| pageSize | number | 페이지 사이즈     | optional          | default: 10 |

Response<br>

```json
{
  "data": {
    "pageSize": 1,
    "totalCount": 2,
    "totalPage": 2,
    "items": [
      {
        "schoolName": "Test",
        "location": "Seoul"
      }
    ]
  },
  "message": null,
  "errorCode": null,
  "result": "SUCCESS"
}
```

### 학교 페이지 구독 취소

Method: DELETE

```http request
http://localhost:3001/api/v1/student/school-page
```

Body<br>

| key             | type   | description       | required/optional | 비고 |
|-----------------|--------|-------------------|-------------------|----|
| schoolPageToken | string | school page token | required          |    |
| studentToken    | string | student token     | required          |    |

```json
{
  "schoolPageToken": "491bd8bd0a30463dbd146abd2cc215e8",
  "studentToken": "4c913002a0efdc17baaa3de32fe4be43"
}
```

Response<br>

```json
{
  "data": null,
  "message": null,
  "errorCode": null,
  "result": "SUCCESS"
}
```

### 구독 중인 학교 소식 목록

Method: GET

```http request
http://localhost:3001/api/v1/student/{studentToken}/school-news/
```

Query Parameter<br>

| key             | type   | description       | required/optional | 비고          |
|-----------------|--------|-------------------|-------------------|-------------|
| schoolPageToken | string | school page token | required          |             |
| pageNo          | number | 페이지 넘버            | optional          | default: 1  |
| pageSize        | number | 페이지 사이즈           | optional          | default: 10 |

Response<br>

```json
{
  "data": {
    "pageSize": 10,
    "totalCount": 6,
    "totalPage": 1,
    "items": [
      {
        "createdAt": "2024-02-17 17:32:23",
        "title": "title6",
        "content": "content6"
      },
      {
        "createdAt": "2024-02-17 17:32:17",
        "title": "title5",
        "content": "content5"
      },
      {
        "createdAt": "2024-02-17 17:32:13",
        "title": "title4",
        "content": "content4"
      },
      {
        "createdAt": "2024-02-17 17:32:07",
        "title": "title3",
        "content": "content3"
      },
      {
        "createdAt": "2024-02-17 17:32:03",
        "title": "title2",
        "content": "content2"
      },
      {
        "createdAt": "2024-02-17 16:35:59",
        "title": "title",
        "content": "change content"
      }
    ]
  },
  "message": null,
  "errorCode": null,
  "result": "SUCCESS"
}
```