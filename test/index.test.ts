import { createSchedule, deleteSchedule, getSchedules } from "../lib/index"
import assert from "assert"

describe(`Module Test`, () => {
    it(`type test`, () => {
        assert((typeof createSchedule) === "function")
        assert((typeof deleteSchedule) === "function")
    })

    it(`createSchedule Test`, async () => {
        const res = await createSchedule({
            ms: 10000,
            type: "json",
            dbHost: "mongodb://localhost:27017/study",
            dirName: "myDB",
            path: "./",
            workName: "schedule1"
        })

        assert.strictEqual(res, true)
    }).timeout(500000)

    it(`deleteSchedule Test`, () => {
        assert.strictEqual(deleteSchedule("schedule1"), true)
    })

    it(`getSchedules Test`, () => {
        assert.strictEqual(getSchedules().length, 0)
    })
})