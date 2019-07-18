
function queryDB(filiaalnummer) {
	"use strict"
	console.log(filiaalnummer)
	var dbRef = firebase.database().ref()
	dbRef.orderByChild("filiaalnummer").equalTo(Number(filiaalnummer)).once("value", function(snapshot) {
		if (!snapshot.exists()) { 
			alert("filiaalnummer niet gevonden")
			return
		}
		snapshot.forEach(function(element) {
			console.log(element.key + " " + element.val())
			var dataList = element.val()
			var div = document.createElement("div")
			div.classList.add("queryText")
			div.innerHTML = "<span>" + "filiaalnummer: " + dataList.filiaalnummer + "</span><br><br>" +
							"<span>" + "adres: " + dataList.address + "</span><br><br>" +
							"<span>" + "postcode: " + dataList.postcode + "</span><br><br>" +
							"<span>" + "info :" + dataList.info + "</span><br><br>"
			
			document.body.appendChild(div)
		})
		
	})
		
}

function clearTextNode() {
	"use strict"
	var textNode = document.querySelectorAll("[class=\"queryText\"]")
	var textNodeArray = [].slice.call(textNode)
	textNodeArray.forEach(function(element) {
		element.parentNode.removeChild(element)
	})
}
