"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var typescript_json_schema_1 = require("../typescript-json-schema");
describe("error", function () {
    it("error-check", function () {
        chai_1.assert.throws(function () {
            typescript_json_schema_1.exec("test/programs/dates/", "MyObject", typescript_json_schema_1.getDefaultArgs());
        }, Error, "No output definition. Probably caused by errors prior to this?");
    });
});
//# sourceMappingURL=error.test.js.map