"use strict";

(function (global) {
  var App = global.App || {};
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

  App.retrieve_list = retrieve_list;
  global.App = App;
})(window);
