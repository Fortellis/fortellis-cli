"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const json_ref_resolver_1 = require("@stoplight/json-ref-resolver");
const fetch = require('node-fetch');
exports.httpReader = {
    resolve(ref) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield fetch(String(ref))).text();
        });
    },
};
exports.httpResolver = new json_ref_resolver_1.Resolver({
    resolvers: {
        https: exports.httpReader,
        http: exports.httpReader,
    },
});
//# sourceMappingURL=http.js.map