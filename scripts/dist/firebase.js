var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "firebase/app", "firebase/database"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var firebase = __importStar(require("firebase/app"));
    require("firebase/database");
    var firebaseConfig = {
        apiKey: "AIzaSyDF2m4vvAS0zQXfn2NQgQxrDZGRblq0wY8",
        authDomain: "tielbeke3.firebaseapp.com",
        databaseURL: "https://tielbeke3.firebaseio.com",
        projectId: "tielbeke3",
        storageBucket: "tielbeke3.appspot.com",
        messagingSenderId: "1010883935820",
        appId: "1:1010883935820:web:7666663961f7de9f4afee9"
    };
    firebase.initializeApp(firebaseConfig);
    var db = firebase.database();
    exports.default = db;
});
