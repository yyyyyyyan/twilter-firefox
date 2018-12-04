document.getElementById('addBtn').onclick = function() {
	let user = document.getElementById('userToFilter').value.trim();
	let filterTo = document.getElementById('filterTo').value.trim();
	if (user != "" && filterTo != "") {
		let filterType = document.getElementById('wordOpt').checked ? "words" : "users";
		let filtersGot = browser.storage.local.get("filters");
		filtersGot[filterType] = filtersGot.hasOwnProperty(filterType) ? filtersGot[filterType] : {};
		filtersGot[filterType][user] = filterTo;
		alert(filtersGot[filterType][user]);
		browser.storage.local.set({filters: filtersGot});
	}
}
let filters = browser.storage.local.get("filters");
alert(filters.values());
let ulUsers = document.getElementById('listUsers');

for (var property in filters) {
	alert(property);
	if (object.hasOwnProperty(property)) {
		let li = document.createElement('li');
		let liText = document.createTextNode(property + " - " + filters.users[property]);
		li.appendChild(liText);
		ulUsers.appendChild(li);
	}
}
console.log('rato');