// apiKey = localStorage.apiKey
host = window.location.host.split(".")[0]
domain = window.location.host.split(".")[1]

// console.log(apiKey)
if (domain === "moysklad") {
	let ids = [
			// "SystemFields.warehouse", 
			"SystemFields.targetAgent",
			"SystemFields.sourceAgent",
			"SystemFields.planningShipmentDate"
			]
	
	let flagHouse = false;
	let currentWareHouseName = "";

	setInterval(function() {
		
		let currentWareHouse = $('div[data-test-id="SystemFields.warehouse"] input');	
		if (currentWareHouse.length > 0) {			
			if (!flagHouse) {
				currentWareHouseName = currentWareHouse.val();
				console.log(currentWareHouseName);
				flagHouse = true;
			}

			let actualWarehouseName = currentWareHouse.val();

			if (flagHouse) {
				if (currentWareHouseName != actualWarehouseName) {
					$('div[data-test-id="editor-toolbar-save-button"]').hide();
				} else {
					$('div[data-test-id="editor-toolbar-save-button"]').show();
				}
			}
		}

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
	}, 400);

}
