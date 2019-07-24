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

	function updateUI(htmlElement,element, index) {
		"use strict"
			var listElement = $("<li></li>",{id : "index"})
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
					mededelingenStorage.forEach(function(element, index) {
					updateUI(htmlElement, element, index)
				})
			
		}
			db.getAllMededelingen().then(function(returnedArray) {
				if (returnedArray) {
						if(mededelingenStorage) {
							returnedArray.forEach (function (element, index) {
								if (mededelingenStorage.findIndex(function (mededeling) {
									var b = JSON.stringify(mededeling) === JSON.stringify(element)
									return b
								}) === -1) {
									mededelingenStorage.push(element)
									updateUI(htmlElement, element,index)
								}
							})
							mededelingenStorage.forEach(function (mededeling , index) {
								if(returnedArray.findIndex (function (element) {
									return JSON.stringify(mededeling) === JSON.stringify(element)
								}) === -1 ) {
									delete mededelingenStorage[index]
									htmlElement.find("#" + index).remove()
								}
							})
						}
						else {
							mededelingenStorage = returnedArray
							mededelingenStorage.forEach(function(element,index) {
								updateUI(htmlElement, element,index)
							})
						}
					localStorage.setItem("mededelingen",JSON.stringify(mededelingenStorage))
				}
			})
	}

	UI.updateElementFromDb = updateElementFromDb
	UI.createElementFromMededelingen = createElementFromMededelingen
	global.UI = UI
})(window)

	
