var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./filialenModel", "jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchFiliaalWidget = void 0;
    var filialenModel_1 = require("./filialenModel");
    var jquery_1 = __importDefault(require("jquery"));
    var SearchFiliaalWidget = /** @class */ (function () {
        function SearchFiliaalWidget() {
            this.input_box = jquery_1.default('.input-box');
            this.zoek_button = jquery_1.default('.btn-search');
            this.filialen_list = jquery_1.default('.filialen-list');
            this.filialen_model = new filialenModel_1.FilialenModel();
            this.add_zoek_button_handler();
        }
        SearchFiliaalWidget.prototype.add_zoek_button_handler = function () {
            var _this = this;
            this.zoek_button.on('click', function () {
                _this.filialen_list.children().remove();
                var input = _this.input_box.val();
                var data = _this.filialen_model.getFiliaalByNumber(Number(input));
                var filiaal_list_element = jquery_1.default('<li>');
                var filiaal_details = '';
                data.then(function (filiaal) {
                    for (var _i = 0, _a = SearchFiliaalWidget.sorted_filiaal_keys(Object.keys(filiaal)); _i < _a.length; _i++) {
                        var attr = _a[_i];
                        filiaal_details += SearchFiliaalWidget.decorate_filiaal_items(filiaal, attr);
                    }
                    filiaal_list_element.html(filiaal_details);
                    _this.filialen_list.append(filiaal_list_element);
                }).catch(function (error) {
                    filiaal_details += "<p>" + error + "</p>";
                    filiaal_list_element.html(filiaal_details);
                    _this.filialen_list.append(filiaal_list_element);
                });
                _this.input_box.val('');
            });
        };
        SearchFiliaalWidget.decorate_filiaal_items = function (filiaal, attr) {
            var filiaal_html_attr = "<p class=\"filiaal-attr\">" + SearchFiliaalWidget.capitalize(attr) + "</p>";
            var filiaal_html_val = "<p class=\"filiaal-val\">" + filiaal[attr] + "</p>";
            filiaal_html_val = SearchFiliaalWidget.add_link(attr, filiaal, filiaal_html_val);
            return filiaal_html_attr + filiaal_html_val;
        };
        SearchFiliaalWidget.sorted_filiaal_keys = function (keys) {
            var sort_schema = {
                filiaalnummer: 1,
                address: 2,
                postcode: 3,
                telnum: 4,
                info: 5,
                mededeling: 6,
            };
            return keys.sort(function (a, b) {
                return sort_schema[a] - sort_schema[b];
            });
        };
        SearchFiliaalWidget.capitalize = function (input) {
            return input.replace(input[0], input[0].toUpperCase());
        };
        SearchFiliaalWidget.add_link = function (attr, filiaal, html_element) {
            if (attr.toLowerCase() === 'address') {
                return "<a href=\"https://maps.google.com/?q=" + filiaal.address + "\">" + html_element + "</a>";
            }
            else {
                return html_element;
            }
        };
        return SearchFiliaalWidget;
    }());
    exports.SearchFiliaalWidget = SearchFiliaalWidget;
});
