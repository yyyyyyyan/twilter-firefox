function setFilter(filterType, toFilter, filterTo, item) {
	item.filters[filterType] = item.filters.hasOwnProperty(filterType) ? item.filters[filterType] : {};
	item.filters[filterType][toFilter] = filterTo;
	browser.storage.local.set({filters: item.filters});
	let ul = document.getElementById(filterType + 'List');
	let li = document.createElement('li');
	let liText = document.createTextNode(toFilter + " - " + filterTo);
	li.appendChild(liText);
	ul.appendChild(li);
}

function listFilters(item) {
	const uls = ['users', 'words'];
	uls.forEach(function(list, index){
		let ul = document.getElementById(list + 'List');
		for (var property in item.filters[list]) {
			let li = document.createElement('li');
			let liText = document.createTextNode(property + " - " + item.filters[list][property]);
			li.appendChild(liText);
			ul.appendChild(li);
		}
	});
}

function onError(error) {
	console.error(error);
}

browser.storage.local.get().then(function(item) {
	if (!item.hasOwnProperty('filters'))
		browser.storage.local.set({filters: {words: {}, users: {}}});
	}, onError);

document.getElementById('addBtn').onclick = function() {
	let toFilter = document.getElementById('toFilter').value.trim();
	let filterTo = document.getElementById('filterTo').value.trim();
	if (toFilter != "" && filterTo != "") {
		let filterType = document.getElementById('wordOpt').checked ? "words" : "users";
		let filtersGot = browser.storage.local.get("filters").then(function(item) {return setFilter(filterType, toFilter, filterTo, item)}, onError);
		document.getElementById('toFilter').value = '';
		document.getElementById('filterTo').value = '';
	}
}

let filters = browser.storage.local.get("filters").then(listFilters, onError);