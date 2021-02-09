import lib from "./lib"
import { MongoClient } from "mongodb"
const main = async () => {
    const client = await MongoClient.connect(
        "mongodb://localhost:27017/study", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = client.db()
    const collections = (await db.listCollections().toArray()).map((args) => {
        return args.name
    })

    lib.createSchedule({
        ms: 10000,
        type: "json",
        dbHost: "mongodb://localhost:27017/study",
        dirName: "myDB",
        path: "./"
        workName: "myWork1"
    }, ...collections)

    setTimeout(() => {
        lib.deleteSchedule("myWork1")
    }, 33333)

}
main()