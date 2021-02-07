import { MongoClient, Db } from "mongodb"

let db: Db | null = null
const connectDB = () => {
    let url: string | undefined
    const connect = async () => {

        try {
            const client = await MongoClient.connect(
                String(url)
                , {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
            const _db = client.db()
            return _db
        } catch (e) {
            console.log(e)
            process.exit(0)
        }
    }

    const get = async () => {
        try {
            if (db != null) {
                return db
            } else {
                db = await connect()
                return db
            }
        }
        catch (e) {
            return e
        }
    }

    return { get, url }
}

export default connectDB()