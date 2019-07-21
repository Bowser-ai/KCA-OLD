(function (global) {
		"use strict"
		var App = global.App || {}
	
		function DataBase () {
			this.dbRef = firebase.database().ref()
		}
	
		DataBase.prototype.queryDb = function (filiaalnummer) {
			return this.dbRef.orderByChild("filiaalnummer").equalTo(Number(filiaalnummer)).once("value").then(function(snapshot) {
				if (!snapshot.exists()) { 
					alert("filiaalnummer niet gevonden")
					return
				}
					return snapshot
			})
		}
		

		DataBase.prototype.updateElementFromDb = function (htmlElement,filiaalnummer) {
			this.queryDb(filiaalnummer).then(function (snapshot) {
			snapshot.forEach(function(element) {
				var dataList = element.val()
				var div = $("<div></div>",{class: "queryText"} )
				div.html("<span>" +  "<b>Filiaalnummer:</b> " + dataList.filiaalnummer + "</span><br><br>" +
						"<a class='maps-link' href='https://www.google.com/maps?q=" + dataList.address + ",netherlands'><span>" + "<b>Adres:</b> " + dataList.address + "</span></a><br><br>" +
						"<span>" + "<b>Postcode:</b> " + dataList.postcode + "</span><br><br>" +
						"<span class=\"info-text\">" + "<b>info:</b> " + dataList.info + "</span><br><br>"
				)
	
				$(htmlElement).append(div)	
				if(dataList.mededeling){
					$(".info-text").last().before("<span>" + "<b>Mededeling:</b> " + dataList.mededeling +/* "</span><a id='dialog-link' href=''>  Wijzig</a>*/"<br><br>") 
					/*$("#dialog-link").click(function(event) {
						event.preventDefault()
						$("#dialog").attr("open","true")
					}) */
				}
				
			})
			
		})
			
	}
	
		DataBase.prototype.getAllMededelingen = function () {
			this.dbRef.orderByChild("filiaalnummer").once("value", function(snapshot) {
				if(snapshot.exists()) {
					snapshot.forEach(function(element) {
						var dataList = element.val()
						if (dataList.mededeling) {
							var listElement = $("<li></li>")
							listElement.html("<span>" + "Filiaalnummer: " + dataList.filiaalnummer + "</span><br><br>" +
								"<a class='maps-link' href='https://www.google.com/maps?q=" + dataList.address + ",netherlands'><span>" + "Adres: " + dataList.address + "</span></a><br><br>" +
								"<span>" + "Mededeling: " + dataList.mededeling + "</span><br><br>"
							)
							listElement.css("color","white")
							listElement.css("background", "grey")
							listElement.css("padding", "10px")
							listElement.css("margin","20px")
							$(".mededelingen-list").append(listElement)
						}
					})
				}
			})
	}
					

	App.DataBase = DataBase
	window.App = App
})(window)

