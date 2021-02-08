import DB from "config/connectDB"
import fs from "fs"
import converter from "json-2-csv"

const makeFolder = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
}

const lib = async () => {
    let schedule

    const createSchedule = async ({ dbHost, ms, path, name, type }: { dbHost: string, ms: number, path: string, name: string, type: string }, ...args: string[]) => {
        const db = await DB.get(dbHost)
        if (db === null) {
            throw new Error("DB Cannot Connect")
        }
        if (type.toLowerCase() !== "csv" && type.toLowerCase() !== "json") {
            throw new Error("type is csv or json")
        }
        if (type.toLowerCase() === "csv") {
            schedule = setInterval(() => {
                const fileName = new Date().toISOString()
                    .replace(/T/, ' ')
                    .replace(/\..+/, '')


                makeFolder(`${path}/${name}_${fileName}`)
                args.forEach(async (collectionName: string) => {
                    let jsonResult = await db.collection(collectionName).find({}).toArray()

                    for (let index = 0; index < Object.keys(jsonResult).length; index++) {
                        jsonResult[index]._id += ""
                    }

                    converter.json2csv(jsonResult, (err, csv) => {
                        if (err) {
                            throw err
                        }
                        fs.writeFileSync(`${path}/${name}_${fileName}/${collectionName}.csv`, csv + "")
                    })
                })
            }, ms)
        }
    }
    return { createSchedule }
}

export default lib()