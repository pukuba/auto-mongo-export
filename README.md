# MongoDB Auto Export CSV, JSON

[![Build Status](https://travis-ci.org/pukuba/auto-mongo-export.svg?branch=master)](https://travis-ci.org/pukuba/auto-mongo-export)

몽고디비를 주기적으로 CSV, JSON으로 Export 해주는 라이브러리 입니다.

A library that periodically exports MongoDB to CSV, JSON.

## 사용법, HOW 

`몽고디비 자동 내보내기 스케줄 생성 / create auto export schedule`

``` js
createSchedule({
    ms: cycle,
    type: export_type "json" or "csv",
    dbHost: DB_HOST
    dirName: folder_name,
    path: stored_path,
    workName: schedule_name
}, colection_name)
```

`몽고디비 자동 내보내기 스케줄 삭제 / delete auto export schedule`
``` js
deleteSchedule(schedule_name)
```

`스케쥴 리스트 / get schedules`

```js
const a = getSchedules()
console.log(a)
```

## 예제, Example

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

// check Schedules
const schedules = MongoExport.getSchedules()
console.log(schedules)

// delete Schedulue
mongoExport.deleteSchedule("schedule1")

```