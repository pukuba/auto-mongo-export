import DB from "./config/connectDB"
import fs from "fs"
import converter from "json-2-csv"

const makeFolder = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
}

const lib = () => {
    let schedule: any = {}
    const createSchedule = async ({ dbHost, ms, path, dirName = "dir", type, workName = "work" }: { dbHost: string, ms: number, path: string, dirName: string, type: string, workName: string }, ...args: string[]) => {
        const db = await DB.get(dbHost)
        if (db === null) {
            throw new Error("DB Cannot Connect")
        }
        if (type.toLowerCase() !== "csv" && type.toLowerCase() !== "json") {
            throw new Error("type is csv or json")
        }
        if (type.toLowerCase() === "csv") {
            schedule[workName] = setInterval(() => {
                const date = new Date().toISOString()
                    .replace(/T/, ' ')
                    .replace(/\..+/, '')


                makeFolder(`${path}/${dirName}_${date}`)
                args.forEach(async (collectionName: string) => {
                    let jsonResult = await db.collection(collectionName).find({}).toArray()

                    for (let index = 0; index < Object.keys(jsonResult).length; index++) {
                        jsonResult[index]._id += ""
                    }

                    converter.json2csv(jsonResult, (err, csv) => {
                        if (err) {
                            throw err
                        }
                        fs.writeFileSync(`${path}/${dirName}_${date}/${collectionName}.csv`, csv + "")
                    })
                })
            }, ms)
        }

        if (type.toLowerCase() === "json") {
            schedule[workName] = setInterval(() => {
                const date = new Date().toISOString()
                    .replace(/T/, ' ')
                    .replace(/\..+/, '')

                makeFolder(`${path}/${dirName}_${date}`)
                args.forEach(async (collectionName: string) => {
                    const jsonResult = await db.collection(collectionName).find({}).toArray()

                    fs.writeFileSync(`${path}/${dirName}_${date}/${collectionName}.json`, JSON.stringify(jsonResult, null, 4))
                })
            }, ms)
        }
    }

    const cancleSchedule = (workName: string) => {
        if (schedule[workName]) {
            clearTimeout(schedule[workName])
        }
    }

    return { createSchedule, cancleSchedule }
}
const { createSchedule, cancleSchedule } = lib()
export { createSchedule, cancleSchedule }
export default lib()