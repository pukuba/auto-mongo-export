import lib from "lib"
import path from "path"

const main = async () => {

    lib.createSchedule({
        ms: 10000,
        type: "json",
        dbHost: "mongodb://localhost:27017/study",
        name: "myDB",
        path: path.join(__dirname, '../log'),
        work: "myWork"
    }, "problem")


    lib.createSchedule({
        ms: 10000,
        type: "csv",
        dbHost: "mongodb://localhost:27017/study",
        name: "myDB",
        path: path.join(__dirname, '../log'),
        work: "myWork"
    }, "problem")

    setTimeout(() => {
        lib.cancleSchedule()
    }, 30000)

}
main()