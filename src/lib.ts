import DB from "config/connectDB"
import { Db } from "mongodb"

let db: Db
const lib = async () => {
    let schedule
    const connect = async (url: string) => {
        DB.url = url
        db = await DB.get()
    }

    const createSchedule = (time: number, type: string, ...args: string[]) => {
        if (db === null) {
            throw new Error("DB Cannot Connect")
        }
        if (type !== "csv" && type !== "CSV" && type !== "json" && type !== "JSON") {
            throw new Error("type is csv(CSV) or json(JSON)")
        }
        if (type === "csv" || type === "CSV") {
            schedule = setTimeout(() => {
                args.forEach(async (name: string) => {
                    await db.collection(name).find({}).toArray()
                })
            }, time)
        }
    }
}