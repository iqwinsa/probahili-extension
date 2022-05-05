// apiKey = localStorage.apiKey
host = window.location.host.split(".")[0]
domain = window.location.host.split(".")[1]

// console.log(apiKey)
if (domain === "moysklad") {
let ids = [ "cb4f0766e-0741-11e8-6b01-4b1d002bd88b", 
			"cef733053-4a23-11e9-9107-504800037ecf",
			"c4eb9c134-075a-11e8-6b01-4b1d002fc969",
			"c36bf5672-075a-11e8-7a6c-d2a90030118a",
			"c45e96366-06a5-11e8-7a69-97110010ff2a",
			"c79e11084-2ad2-11e9-9ff4-34e800065ab7",
			"c02da1550-195c-11eb-0a80-06c50001633a",
			"ca5c52b0a-0fff-11e8-9ff4-31500003dcf5",
			"cbe8d2bcf-e41a-11e8-9ff4-315000140059",
			"c3f09d382-2b8c-11e9-9ff4-3150000f37f6",
			"cf61aa183-267a-11eb-0a80-030b00163c65",
			"c6c03b0a4-286b-11e8-9ff4-34e8000b5ad9",
			"c1b229da7-20b8-11ea-0a80-064c000668d4",
			"ca9a40cc6-8af6-11ea-0a80-0148000a58ae"
		]

setInterval(function() {
num = null
//	console.log(document.addEventListener("DOMContentLoaded", ready))
hash = window.location.hash.split("=")
id = hash[1];
if (document.getElementById("c02da1550-195c-11eb-0a80-06c50001633a") != null) num = document.getElementById("c02da1550-195c-11eb-0a80-06c50001633a").value
if (num != null && num != "") {
if (id != "" && (hash[0].indexOf("customerorder") == 1)) {
	ids.forEach(function(id) {
		elem = document.getElementById(id)
		if (elem != null) {
		elemInput = elem.querySelector("input")
		document.getElementsByClassName("search-selector")[2].querySelector("input").setAttribute("disabled", "disabled");
		document.getElementsByClassName("search-selector")[2].getElementsByClassName("clear-button")[0].style.display = "none";
		document.getElementsByClassName("search-selector")[2].getElementsByClassName("load-button")[0].style.display = "none"
		document.getElementsByClassName("main-panel")[0].getElementsByClassName("b-calendar")[0].querySelector("input").setAttribute("disabled", "disabled");
		document.getElementsByClassName("main-panel")[0].getElementsByClassName("b-calendar")[0].getElementsByClassName("b-calendar-icon")[0].style.display = "none"
		if (elemInput == null) {
			elem.setAttribute("disabled", "disabled");
			} else {
			let elemBtns = elem.getElementsByClassName("load-button")
			let elemClearBtn = elem.getElementsByClassName("clear-button")
			elemInput.setAttribute("disabled", "disabled");
			if (elemBtns.length >= 1) {		
				elemBtns[0].style.display = "none"
			}
			if (elemClearBtn.length >= 1) {
				elemClearBtn[0].style.display = "none"
			}
		}
	}	
	});
}
}
// let saveBtn = document.getElementsByClassName("b-popup-button b-popup-button-enabled b-popup-button-green tutorial-save-button")[0]
// saveBtn.style.display = "none";
// console.log("text: " + host)
}, 400);

}

// setInterval(function() {
// if (!apiKey) {
// // console.log(apiKey)
// fetch('https://xn--80abwmlfh7b4c.xn--p1ai/integrations/extension_stocks/ms.php?request=true&site=' + host)
// .then(response => response.text())
// .then(result => { apiKey = result, localStorage.setItem('apiKey', apiKey);})
// console.log('Probahili Extension loaded with API key')
// } else {
//   return false
// }
// }, 1000);