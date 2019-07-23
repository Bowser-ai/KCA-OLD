(function (global) {
		"use strict"
		var App = global.App || {}
	
		function DataBase () {
			this.dbRef = firebase.database().ref()
		}
	
		DataBase.prototype.queryDb = function (filiaalnummer) {
			"use strict"
			return this.dbRef.orderByChild("filiaalnummer").equalTo(Number(filiaalnummer)).once("value").then(function(snapshot) {
				if (!snapshot.exists()) { 
					alert("filiaalnummer niet gevonden")
					return
				}
				var filialenArray =[]
				snapshot.forEach(function (element) {
					filialenArray.push(element.val())
				})
				return filialenArray
			})
		}
		

	
		DataBase.prototype.getAllMededelingen = function () {
			"use strict"
			return this.dbRef.orderByChild("filiaalnummer").once("value").then(function(snapshot) {
				if(snapshot.exists()) {
					var filialenList = []
					snapshot.forEach(function(element) {
						if (element.val().mededeling) {
							filialenList.push(element.val())
						}
					})
					return filialenList
				}
			})
		}
					

	App.DataBase = DataBase
	window.App = App
})(window)

