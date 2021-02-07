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
        if (type.toLowerCase() !== "csv" && type.toLowerCase() !== "json") {
            throw new Error("type is csv or json")
        }
        if (type.toLowerCase() === "csv") {
            schedule = setTimeout(() => {
                args.forEach(async (name: string) => {
                    await db.collection(name).find({}).toArray()
                })
            }, time)
        }
    }
}