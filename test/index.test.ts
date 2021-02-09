import mongoExport from "../lib/index"
import assert from "assert"

describe(`Module Test`, () => {
    it(`type test`, () => {
        assert((typeof mongoExport.createSchedule) === "function")
        assert((typeof mongoExport.deleteSchedule) === "function")
    })
})