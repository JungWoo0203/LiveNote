# 클라이언트 연동

## 생성

- url: /connect/client
- method: POST
- description: 클라이언트 연동 고유번호를 생성합니다.
- request
  |           | name      | type         | description        |
  | --------- | --------- | ------------ | ------------------ |
  | Parameter | noteCodes | List<String> | 코드 고유번호 List |
- response
  | name      | type        | description               |
  | --------- | ----------- | ------------------------- |
  | id        | String      | 클라이언트 연동 고유 uuid |
  | code      | String      | 클라이언트 연동 고유번호  |
  | noteCodes | Set<String> | 메모 고유번호 list        |

## 상세 조회

- url: /connect/client
- method: GET
- description: 상세 내역을 조회합니다
- request
  |        | name         | type   | description              |
  | ------ | ------------ | ------ | ------------------------ |
  | Header | Connect-Code | String | 클라이언트 연동 고유번호 |
- response
  | name      | type        | description               |
  | --------- | ----------- | ------------------------- |
  | id        | String      | 클라이언트 연동 고유 uuid |
  | code      | String      | 클라이언트 연동 고유번호  |
  | noteCodes | Set<String> | 메모 고유번호 list        |

## 메모 고유번호 삭제

- url: /connect/client/note/codes/{code}
- method: DELETE
- description: 메모 고유번호를 삭제합니다
  메모 내역에서 메모 삭제 시 다른 클라이언트에도 반영하기 위해 사용됩니다.
- request
  |              | name         | type   | description              |
  | ------------ | ------------ | ------ | ------------------------ |
  | Header       | Connect-Code | String | 클라이언트 연동 고유번호 |
  | PathVariable | code         | String | 메모 고유번호            |
- response

  | name      | type        | description               |
  | --------- | ----------- | ------------------------- |
  | id        | String      | 클라이언트 연동 고유 uuid |
  | code      | String      | 클라이언트 연동 고유번호  |
  | noteCodes | Set<String> | 메모 고유번호 list        |

  ***

# 메모장

## 내역

- url: /note/list
- method: GET
- description: 내역을 조회합니다.
- request
  |           | name  | type         | description        |
  | --------- | ----- | ------------ | ------------------ |
  | Parameter | codes | List<String> | 메모 고유코드 내역 |
- response
  | name |            | type         | description                  |
  | ---- | ---------- | ------------ | ---------------------------- |
  |      |            | List<Object> |                              |
  |      | code       | String       | 메모 고유코드                |
  |      | title      | String       | 제목                         |
  |      | content    | String       | 내용                         |
  |      | createDate | String       | 생성일자 yyyy-MM-dd HH:mm:ss |
  |      | updateDate | String       | 수정일자 yyyy-MM-dd HH:mm:ss |

## 추가

- url: /note
- method: POST
- description: 메모를 새로 추가합니다
  Connect-Code가 있을 시 연동된 모든 클라이언트 메모 내역에 업데이트 됩니다.
- request
  |        | name         | type    | description |
  | ------ | ------------ | ------- | ----------- |
  | Header | Connect-Code | String? | 연동 코드   |
- response
  | name       | type   | description                  |
  | ---------- | ------ | ---------------------------- |
  | code       | String | 메모 고유코드                |
  | title      | String | 제목                         |
  | content    | String | 내용                         |
  | createDate | String | 생성일자 yyyy-MM-dd HH:mm:ss |
  | updateDate | String | 수정일자 yyyy-MM-dd HH:mm:ss |

## 등록/추가

- url: /note/{code}
- method: POST
- description: 메모 고유코드와 일치하는 메모를 등록하거나 새로 추가합니다
  Connect-Code가 있을 시 연동된 모든 클라이언트 메모 내역에 업데이트 됩니다.
- request
  |              | name         | type    | description   |
  | ------------ | ------------ | ------- | ------------- |
  | Header       | Connect-Code | String? | 연동 코드     |
  | PathVariable | code         | String  | 메모 고유코드 |
- response
  | name       | type   | description                  |
  | ---------- | ------ | ---------------------------- |
  | code       | String | 메모 고유코드                |
  | title      | String | 제목                         |
  | content    | String | 내용                         |
  | createDate | String | 생성일자 yyyy-MM-dd HH:mm:ss |
  | updateDate | String | 수정일자 yyyy-MM-dd HH:mm:ss |

## 제목 수정

- url: /note/{code}/title
- method: PUT
- description: 메모 제목을 수정합니다.
- request
  |              | name  | type   | description   |
  | ------------ | ----- | ------ | ------------- |
  | PathVariable | code  | String | 메모 고유코드 |
  | Body         | title | String | 제목          |

## 내용 수정

- url: /note/{code}/content
- method: PUT
- description: 메모 내용을 수정합니다.
- request
  |              | name | type   | description   |
  | ------------ | ---- | ------ | ------------- |
  | PathVariable | code | String | 메모 고유코드 |
  | Body         | c    | String | 내용          |
