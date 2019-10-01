(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var firebaseConfig = {
  apiKey: "AIzaSyDF2m4vvAS0zQXfn2NQgQxrDZGRblq0wY8",
  authDomain: "tielbeke3.firebaseapp.com",
  databaseURL: "https://tielbeke3.firebaseio.com",
  projectId: "tielbeke3",
  storageBucket: "tielbeke3.appspot.com",
  messagingSenderId: "1010883935820",
  appId: "1:1010883935820:web:3320f49198950cf0"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database().ref();

function retrieve_list() {
  return database.orderByChild("filiaalnummer").once("value").then(function (snapshot) {
    var filialen_list = {};
    snapshot.forEach(function (elem) {
      filialen_list[elem.val()["filiaalnummer"]] = elem.val();
    });
    return filialen_list;
  });
}

module.exports = {
  retrieve_list: retrieve_list
};

},{}],2:[function(require,module,exports){
"use strict";

var database = require('./database'); // creates a div output for the retrieved data and attatch it to the main
// content


function create_div_output(target_element, innerText) {
  $(target_element).append($('<div>', {
    'class': 'output-box',
    hidden: true
  }).html(innerText));
  $('.output-box').show("slow");
} //init vars, and html refs


var $ = jQuery;
var $search_button = $('.btn-search');
var $clear_button = $('.btn-clear');
var $main_content = $('.main');
var $input_box = $('.input-box'); //grab promise from firebase Database, get whole list async

var filialen_list_promise = database.retrieve_list(); //add click_handelers to the buttons in the main_ui

$clear_button.click(function (event) {
  $('.output-box').hide("slow", function () {
    $main_content.find('.output-box').empty();
    $main_content.find('.output-box').remove();
  });
});
$search_button.click(function (event) {
  filialen_list_promise.then(function (snapshot) {
    if ($input_box.val()) {
      var filiaal = snapshot[$input_box.val()];

      if (!filiaal) {
        create_div_output($main_content, "Filiaalnummer Bestaat niet in de Database<br>");
        return;
      }

      create_div_output($main_content, "<b style=\"text-decoration:underline\">FiliaalNummer</b> : ".concat(filiaal["filiaalnummer"], "<br>\n                   <b style=\"text-decoration:underline\">Adres</b> : <a href='https://google.com/maps?q=").concat(filiaal["address"], "'>\n                   ").concat(filiaal["address"], "</a><br>\n               <b style=\"text-decoration:underline\">PostCode</b> : ").concat(filiaal["postcode"], "<br>\n               <b style=\"text-decoration:underline\">Info</b> : ").concat(filiaal["info"], "<br>\n                   <b style=\"text-decoration:underline\">Mededeling</b> : ").concat(filiaal["mededeling"] ? filiaal["mededeling"] : "Geen Mededeling Ingevoerd", "<br>"));
    } else {
      create_div_output($main_content, "Onjuiste Invoer, enkel getallen zijn toegestaan!");
    }

    $input_box.get(0).value = "";
  });
});

},{"./database":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9kYXRhYmFzZS5qcyIsInNyYy9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NJLElBQU0sY0FBYyxHQUFHO0FBQ2YsRUFBQSxNQUFNLEVBQUUseUNBRE87QUFFZixFQUFBLFVBQVUsRUFBRSwyQkFGRztBQUdmLEVBQUEsV0FBVyxFQUFFLGtDQUhFO0FBSWYsRUFBQSxTQUFTLEVBQUUsV0FKSTtBQUtmLEVBQUEsYUFBYSxFQUFFLHVCQUxBO0FBTWYsRUFBQSxpQkFBaUIsRUFBRSxlQU5KO0FBT2YsRUFBQSxLQUFLLEVBQUU7QUFQUSxDQUF2QjtBQVVBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCO0FBRUEsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVQsR0FBb0IsR0FBcEIsRUFBakI7O0FBRUEsU0FBUyxhQUFULEdBQTBCO0FBQ3RCLFNBQU8sUUFBUSxDQUFDLFlBQVQsQ0FBc0IsZUFBdEIsRUFBdUMsSUFBdkMsQ0FBNEMsT0FBNUMsRUFBcUQsSUFBckQsQ0FBMkQsVUFBQyxRQUFELEVBQWM7QUFDNUUsUUFBSSxhQUFhLEdBQUcsRUFBcEI7QUFDQSxJQUFBLFFBQVEsQ0FBQyxPQUFULENBQWtCLFVBQUMsSUFBRCxFQUFVO0FBQ3hCLE1BQUEsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFMLEdBQVcsZUFBWCxDQUFELENBQWIsR0FBNkMsSUFBSSxDQUFDLEdBQUwsRUFBN0M7QUFDSCxLQUZEO0FBR0EsV0FBTyxhQUFQO0FBQ0gsR0FOTSxDQUFQO0FBT0g7O0FBRUwsTUFBTSxDQUFDLE9BQVAsR0FBaUI7QUFBQyxFQUFBLGFBQWEsRUFBYjtBQUFELENBQWpCOzs7OztBQ3pCQSxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBRCxDQUF4QixDLENBRUk7QUFDSjs7O0FBQ0ksU0FBUyxpQkFBVCxDQUE0QixjQUE1QixFQUEyQyxTQUEzQyxFQUFxRDtBQUNqRCxFQUFBLENBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0IsTUFBbEIsQ0FDSSxDQUFDLENBQUMsT0FBRCxFQUFVO0FBQUMsYUFBVSxZQUFYO0FBQXdCLElBQUEsTUFBTSxFQUFHO0FBQWpDLEdBQVYsQ0FBRCxDQUFtRCxJQUFuRCxDQUNJLFNBREosQ0FESjtBQUtBLEVBQUEsQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQixJQUFqQixDQUFzQixNQUF0QjtBQUNILEMsQ0FFRDs7O0FBQ0EsSUFBTSxDQUFDLEdBQUcsTUFBVjtBQUNBLElBQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxhQUFELENBQXhCO0FBQ0EsSUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLFlBQUQsQ0FBdkI7QUFDQSxJQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsT0FBRCxDQUF2QjtBQUNBLElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxZQUFELENBQXBCLEMsQ0FFQTs7QUFDQSxJQUFJLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxhQUFULEVBQTVCLEMsQ0FFSTs7QUFFSixhQUFhLENBQUMsS0FBZCxDQUFxQixVQUFDLEtBQUQsRUFBVztBQUM1QixFQUFBLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIsSUFBakIsQ0FBc0IsTUFBdEIsRUFBOEIsWUFBTTtBQUNoQyxJQUFBLGFBQWEsQ0FBQyxJQUFkLENBQW1CLGFBQW5CLEVBQWtDLEtBQWxDO0FBQ0EsSUFBQSxhQUFhLENBQUMsSUFBZCxDQUFtQixhQUFuQixFQUFrQyxNQUFsQztBQUNILEdBSEQ7QUFJSCxDQUxEO0FBT0EsY0FBYyxDQUFDLEtBQWYsQ0FBc0IsVUFBQyxLQUFELEVBQVc7QUFDOUIsRUFBQSxxQkFBcUIsQ0FBQyxJQUF0QixDQUE0QixVQUFDLFFBQUQsRUFBZTtBQUN2QyxRQUFJLFVBQVUsQ0FBQyxHQUFYLEVBQUosRUFBc0I7QUFDbEIsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFYLEVBQUQsQ0FBeEI7O0FBQ0EsVUFBSSxDQUFDLE9BQUwsRUFBYztBQUNWLFFBQUEsaUJBQWlCLENBQUMsYUFBRCxrREFBakI7QUFHQTtBQUNIOztBQUNELE1BQUEsaUJBQWlCLENBQUMsYUFBRCx1RUFDK0MsT0FBTyxDQUFDLGVBQUQsQ0FEdEQsNEhBRXlFLE9BQU8sQ0FBQyxTQUFELENBRmhGLG9DQUdYLE9BQU8sQ0FBQyxTQUFELENBSEksNEZBSXFDLE9BQU8sQ0FBQyxVQUFELENBSjVDLG9GQUtpQyxPQUFPLENBQUMsTUFBRCxDQUx4Qyw4RkFNNEMsT0FBTyxDQUFDLFlBQUQsQ0FBUixHQUM1RCxPQUFPLENBQUMsWUFBRCxDQURxRCxHQUNwQywyQkFQUCxVQUFqQjtBQVNQLEtBakJHLE1Ba0JLO0FBQ0QsTUFBQSxpQkFBaUIsQ0FBQyxhQUFELHFEQUFqQjtBQUdIOztBQUNKLElBQUEsVUFBVSxDQUFDLEdBQVgsQ0FBZSxDQUFmLEVBQWtCLEtBQWxCLEdBQTBCLEVBQTFCO0FBQ0EsR0F6QkQ7QUEwQkYsQ0EzQkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcbiAgICBjb25zdCBmaXJlYmFzZUNvbmZpZyA9IHtcbiAgICAgICAgICAgIGFwaUtleTogXCJBSXphU3lERjJtNHZ2QVMwelFYZm4yTlFnUXhyRFpHUmJscTB3WThcIixcbiAgICAgICAgICAgIGF1dGhEb21haW46IFwidGllbGJla2UzLmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly90aWVsYmVrZTMuZmlyZWJhc2Vpby5jb21cIixcbiAgICAgICAgICAgIHByb2plY3RJZDogXCJ0aWVsYmVrZTNcIixcbiAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwidGllbGJla2UzLmFwcHNwb3QuY29tXCIsXG4gICAgICAgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxMDEwODgzOTM1ODIwXCIsXG4gICAgICAgICAgICBhcHBJZDogXCIxOjEwMTA4ODM5MzU4MjA6d2ViOjMzMjBmNDkxOTg5NTBjZjBcIlxuICAgICAgICB9O1xuXG4gICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XG5cbiAgICBjb25zdCBkYXRhYmFzZSA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCk7XG5cbiAgICBmdW5jdGlvbiByZXRyaWV2ZV9saXN0ICgpIHtcbiAgICAgICAgcmV0dXJuIGRhdGFiYXNlLm9yZGVyQnlDaGlsZChcImZpbGlhYWxudW1tZXJcIikub25jZShcInZhbHVlXCIpLnRoZW4oIChzbmFwc2hvdCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpbGlhbGVuX2xpc3QgPSB7fTtcbiAgICAgICAgICAgIHNuYXBzaG90LmZvckVhY2goIChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlsaWFsZW5fbGlzdFtlbGVtLnZhbCgpW1wiZmlsaWFhbG51bW1lclwiXV0gPSBlbGVtLnZhbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmlsaWFsZW5fbGlzdDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtyZXRyaWV2ZV9saXN0fTtcbiIsImNvbnN0IGRhdGFiYXNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZScpO1xuXG4gICAgLy8gY3JlYXRlcyBhIGRpdiBvdXRwdXQgZm9yIHRoZSByZXRyaWV2ZWQgZGF0YSBhbmQgYXR0YXRjaCBpdCB0byB0aGUgbWFpblxuLy8gY29udGVudFxuICAgIGZ1bmN0aW9uIGNyZWF0ZV9kaXZfb3V0cHV0ICh0YXJnZXRfZWxlbWVudCxpbm5lclRleHQpe1xuICAgICAgICAkKHRhcmdldF9lbGVtZW50KS5hcHBlbmQoXG4gICAgICAgICAgICAkKCc8ZGl2PicsIHsnY2xhc3MnIDogJ291dHB1dC1ib3gnLGhpZGRlbiA6IHRydWV9KS5odG1sKFxuICAgICAgICAgICAgICAgIGlubmVyVGV4dFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICAkKCcub3V0cHV0LWJveCcpLnNob3coXCJzbG93XCIpO1xuICAgIH1cblxuICAgIC8vaW5pdCB2YXJzLCBhbmQgaHRtbCByZWZzXG4gICAgY29uc3QgJCA9IGpRdWVyeTtcbiAgICBjb25zdCAkc2VhcmNoX2J1dHRvbiA9ICQoJy5idG4tc2VhcmNoJyk7XG4gICAgY29uc3QgJGNsZWFyX2J1dHRvbiA9ICQoJy5idG4tY2xlYXInKTsgXG4gICAgY29uc3QgJG1haW5fY29udGVudCA9ICQoJy5tYWluJyk7XG4gICAgY29uc3QgJGlucHV0X2JveCA9ICQoJy5pbnB1dC1ib3gnKTtcblxuICAgIC8vZ3JhYiBwcm9taXNlIGZyb20gZmlyZWJhc2UgRGF0YWJhc2UsIGdldCB3aG9sZSBsaXN0IGFzeW5jXG4gICAgbGV0IGZpbGlhbGVuX2xpc3RfcHJvbWlzZSA9IGRhdGFiYXNlLnJldHJpZXZlX2xpc3QoKTtcblxuICAgICAgICAvL2FkZCBjbGlja19oYW5kZWxlcnMgdG8gdGhlIGJ1dHRvbnMgaW4gdGhlIG1haW5fdWlcblxuICAgICRjbGVhcl9idXR0b24uY2xpY2soIChldmVudCkgPT4ge1xuICAgICAgICAkKCcub3V0cHV0LWJveCcpLmhpZGUoXCJzbG93XCIsICgpID0+IHtcbiAgICAgICAgICAgICRtYWluX2NvbnRlbnQuZmluZCgnLm91dHB1dC1ib3gnKS5lbXB0eSgpO1xuICAgICAgICAgICAgJG1haW5fY29udGVudC5maW5kKCcub3V0cHV0LWJveCcpLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICRzZWFyY2hfYnV0dG9uLmNsaWNrKCAoZXZlbnQpID0+IHtcbiAgICAgICBmaWxpYWxlbl9saXN0X3Byb21pc2UudGhlbiggKHNuYXBzaG90KSA9PiAge1xuICAgICAgICAgICBpZiAoJGlucHV0X2JveC52YWwoKSkge1xuICAgICAgICAgICAgICAgY29uc3QgZmlsaWFhbCA9IHNuYXBzaG90WyRpbnB1dF9ib3gudmFsKCldO1xuICAgICAgICAgICAgICAgaWYgKCFmaWxpYWFsKSB7XG4gICAgICAgICAgICAgICAgICAgY3JlYXRlX2Rpdl9vdXRwdXQoJG1haW5fY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgYEZpbGlhYWxudW1tZXIgQmVzdGFhdCBuaWV0IGluIGRlIERhdGFiYXNlPGJyPmBcbiAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIGNyZWF0ZV9kaXZfb3V0cHV0KCRtYWluX2NvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgYDxiIHN0eWxlPVwidGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZVwiPkZpbGlhYWxOdW1tZXI8L2I+IDogJHtmaWxpYWFsW1wiZmlsaWFhbG51bW1lclwiXX08YnI+XG4gICAgICAgICAgICAgICAgICAgPGIgc3R5bGU9XCJ0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lXCI+QWRyZXM8L2I+IDogPGEgaHJlZj0naHR0cHM6Ly9nb29nbGUuY29tL21hcHM/cT0ke2ZpbGlhYWxbXCJhZGRyZXNzXCJdfSc+XG4gICAgICAgICAgICAgICAgICAgJHtmaWxpYWFsW1wiYWRkcmVzc1wiXX08L2E+PGJyPlxuICAgICAgICAgICAgICAgPGIgc3R5bGU9XCJ0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lXCI+UG9zdENvZGU8L2I+IDogJHtmaWxpYWFsW1wicG9zdGNvZGVcIl19PGJyPlxuICAgICAgICAgICAgICAgPGIgc3R5bGU9XCJ0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lXCI+SW5mbzwvYj4gOiAke2ZpbGlhYWxbXCJpbmZvXCJdfTxicj5cbiAgICAgICAgICAgICAgICAgICA8YiBzdHlsZT1cInRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmVcIj5NZWRlZGVsaW5nPC9iPiA6ICR7KGZpbGlhYWxbXCJtZWRlZGVsaW5nXCJdKT9cbiAgICAgICAgICAgICAgIGZpbGlhYWxbXCJtZWRlZGVsaW5nXCJdIDogXCJHZWVuIE1lZGVkZWxpbmcgSW5nZXZvZXJkXCJ9PGJyPmBcbiAgICAgICAgICAgKTtcbiAgICAgICB9XG4gICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgY3JlYXRlX2Rpdl9vdXRwdXQoJG1haW5fY29udGVudCxcbiAgICAgICAgICAgICAgICAgICBgT25qdWlzdGUgSW52b2VyLCBlbmtlbCBnZXRhbGxlbiB6aWpuIHRvZWdlc3RhYW4hYFxuICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgfVxuICAgICAgICAkaW5wdXRfYm94LmdldCgwKS52YWx1ZSA9IFwiXCI7XG4gICAgICAgfSk7XG4gICAgfSk7XG4gICBcbiAgICAgICBcblxuIl19
