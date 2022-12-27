// apiKey = localStorage.apiKey
host = window.location.host.split(".")[0]
domain = window.location.host.split(".")[1]

// console.log(apiKey)
if (domain === "moysklad") {
	let ids = [ "SystemFields.warehouse", 
				"SystemFields.targetAgent",
				"SystemFields.sourceAgent",
				"SystemFields.planningShipmentDate",
				// "c45e96366-06a5-11e8-7a69-97110010ff2a",
				// "c79e11084-2ad2-11e9-9ff4-34e800065ab7",
				// "c02da1550-195c-11eb-0a80-06c50001633a",
				// "ca5c52b0a-0fff-11e8-9ff4-31500003dcf5",
				// "cbe8d2bcf-e41a-11e8-9ff4-315000140059",
				// "c3f09d382-2b8c-11e9-9ff4-3150000f37f6",
				// "cf61aa183-267a-11eb-0a80-030b00163c65",
				// "c6c03b0a4-286b-11e8-9ff4-34e8000b5ad9",
				// "c1b229da7-20b8-11ea-0a80-064c000668d4",
				// "ca9a40cc6-8af6-11ea-0a80-0148000a58ae"
			]

	setInterval(function() {
		num = null
		//	console.log(document.addEventListener("DOMContentLoaded", ready))
		hash = window.location.hash.split("=")
		id = hash[1];

		if (document.getElementById("c02da1550-195c-11eb-0a80-06c50001633a") != null) {
			num = document.getElementById("c02da1550-195c-11eb-0a80-06c50001633a").value
		}

		if (num != null && num != "") {
			if (id != "" && (hash[0].indexOf("customerorder") == 1)) {						
				ids.forEach(function(id) {				
					//elem = document.getElementById(id)
					elem = $('div[data-test-id="'+id+'"]');
					if (elem.length > 0) {
						
						elemInput = elem.find("input");
						// console.log(elemInput);
						
						if (elemInput.length > 0) {
							elemInput.attr("disabled", "disabled");
							let isClearBtn = elem.find('[data-test-id="clear-btn"]');
							let isDropDownBtn = elem.find('[data-test-id="dropdown-btn"]');
							let isCalendarHas = elem.find('[data-test-id="datepicker-input"]');

							if (isClearBtn.length > 0) {		
								isClearBtn.hide();
							}

							if (isDropDownBtn.length > 0) {
								isDropDownBtn.hide();
							}

							if (isCalendarHas.length > 0) {
								elem.find("div").hide();
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