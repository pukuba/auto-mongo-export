import DB from "config/connectDB"

const main = async () => {
    DB.url = "mongodb://localhost:27017/study"
}
main()