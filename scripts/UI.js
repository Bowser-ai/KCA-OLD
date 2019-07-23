(function (global) {

	var UI = global.UI || {}

		updateElementFromDb = function (db,htmlElement,filiaalnummer) {
			"use strict"
			db.queryDb(filiaalnummer).then(function (snapshot) {
				if(snapshot){
					snapshot.forEach(function(element) {
						var dataList = element
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
						} else {
							$(".info-text").last().before("<span>" + "<b>Mededeling:</b> " + "<i>\"Geen mededeling ingevoerd\"</i>" + "<br><br>")
						}
				
					})
				}
			})
			
		}

	function updateUI(htmlElement,element) {
		"use strict"
			var listElement = $("<li></li>")
			listElement.html("<span>" + "Filiaalnummer: " + element.filiaalnummer + "</span><br><br>" +
				"<a class='maps-link' href='https://www.google.com/maps?q=" + element.address
				+ ",netherlands'><span>" + "Adres: " + element.address + "</span></a><br><br>" +
				"<span>" + "Mededeling: " + element.mededeling + "</span><br><br>"
			)
			listElement.css("color","white")
			listElement.css("background", "grey")
			listElement.css("padding", "10px")
			listElement.css("margin","20px")
			$(htmlElement).append(listElement)
	}

	function createElementFromMededelingen(db, htmlElement) {
		"use strict"
		
		if (localStorage.getItem("mededelingen")) {
				var mededelingenStorage = JSON.parse(localStorage.getItem("mededelingen"))
			if(!mededelingenStorage) mededelingenStorage = []
					mededelingenStorage.forEach(function(element) {
					updateUI(htmlElement, element)
				})
			
		}
			db.getAllMededelingen().then(function(returnedArray) {
				console.log("excuting....getAllMedelingen callback")
				if (returnedArray) {
					returnedArray.forEach (function (element) {
						if(mededelingenStorage) {
							if (mededelingenStorage.findIndex(function (mededeling) {
								return mededeling === element
							}) == -1) {
								mededelingenStorage.push(element)
								updateUI(htmlElement, element)
							}
						}
						else {
							mededelingenStorage = returnedArray
							mededelingenStorage.forEach(function(element) {
								updateUI(htmlElement, element)
							})
						}
					})
					localStorage.setItem("mededelingen",JSON.stringify(mededelingenStorage))
				}
			})
	}

	UI.updateElementFromDb = updateElementFromDb
	UI.createElementFromMededelingen = createElementFromMededelingen
	global.UI = UI
})(window)

	