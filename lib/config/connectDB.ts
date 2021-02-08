import { MongoClient, Db } from "mongodb"

let db: Db | null = null
const connectDB = () => {

    const connect = async (url: String) => {
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

    const get = async (url: String) => {
        try {
            if (db != null) {
                return db
            } else {
                db = await connect(url)
                return db
            }
        }
        catch (e) {
            return e
        }
    }

    return { get }
}

export default connectDB()