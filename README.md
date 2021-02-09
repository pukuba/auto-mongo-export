# MongoDB Auto Export CSV, JSON

## 사용법

`몽고디비 자동 내보내기 스케줄 생성`
``` js
createSchedule({
    ms: 주기
    type: 저장될 데이터 타입("csv" or "json")
    dbHost: DB주소
    dirName: 저장될 파일명
    path: 파일을 저장할 디렉토리 주소
    workName: 스케쥴 이름
}, 콜렉션 이름)
```

`몽고디비 자동 내보내기 스케줄 삭제`
``` js
deleteSchedule(스케쥴 이름)
```

## 예제

``` js
const mongoExport = require("auto-mongo-export")

// create Schedule
mongoExport.createSchedule({
    ms: 10000,
    type: "json",
    dbHost: "mongodb://localhost:27017/example",
    dirName: "myDB",
    path: "./",
    workName: "schedule1"
}, "collection1", "collection2", "collection3")

// delete Schedulue
mongoExport.deleteSchedule("schedule1")

```