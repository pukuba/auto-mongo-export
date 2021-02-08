import lib from "lib"
import path from "path"

const main = async () => {
    (await lib).createSchedule({
        ms: 10000,
        type: "csv",
        dbHost: "mongodb://localhost:27017/study",
        name: "myDB",
        path: path.join(__dirname, '../log')
    }, "problem")
}
main()