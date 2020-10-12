var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./filialenModel", "./searchFiliaalWidget", "jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var filialenModel_1 = require("./filialenModel");
    var searchFiliaalWidget_1 = require("./searchFiliaalWidget");
    var jquery_1 = __importDefault(require("jquery"));
    var FilialenList = /** @class */ (function () {
        function FilialenList() {
            this.filialen_model = new filialenModel_1.FilialenModel();
            this.filialen_list_container = jquery_1.default('.filialen-list');
            this.filialen_list = [];
            this.create_filialen_list();
            this.add_search_bar_handler();
        }
        FilialenList.prototype.create_filialen_list = function (list) {
            if (list === void 0) { list = null; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, _i, _b, filiaal, li_element, filiaal_details, _c, _d, attr;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (!(list === null || this.filialen_list.length === 0)) return [3 /*break*/, 2];
                            _a = this;
                            return [4 /*yield*/, this.filialen_model.getAllFilialen()];
                        case 1:
                            _a.filialen_list = _e.sent();
                            _e.label = 2;
                        case 2:
                            for (_i = 0, _b = (list || this.filialen_list); _i < _b.length; _i++) {
                                filiaal = _b[_i];
                                li_element = jquery_1.default('<li>');
                                filiaal_details = '';
                                for (_c = 0, _d = searchFiliaalWidget_1.SearchFiliaalWidget.sorted_filiaal_keys(Object.keys(filiaal)); _c < _d.length; _c++) {
                                    attr = _d[_c];
                                    filiaal_details += searchFiliaalWidget_1.SearchFiliaalWidget.decorate_filiaal_items(filiaal, attr);
                                }
                                li_element.html(filiaal_details);
                                this.filialen_list_container.append(li_element);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        FilialenList.prototype.add_search_bar_handler = function () {
            var _this = this;
            var search_bar_elem = jquery_1.default('.search-bar');
            search_bar_elem.on('keypress', function (e) {
                if (e.which === 13) {
                    var value_1 = search_bar_elem.val();
                    _this.filialen_list_container.children().remove();
                    if (value_1 === '' || value_1 === null) {
                        _this.create_filialen_list();
                    }
                    var filtered_list = _this.filialen_list.filter(function (filiaal) {
                        return filiaal['address'].toLowerCase().includes(value_1.toLowerCase());
                    });
                    _this.create_filialen_list(filtered_list);
                }
            });
        };
        return FilialenList;
    }());
    new FilialenList();
});
