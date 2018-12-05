function onGot(item) {
	console.log('a');
}

function onGota(filterType, user, filterTo, item) {
	console.log(item);
	item.filters[filterType] = item.filters.hasOwnProperty(filterType) ? item.filters[filterType] : {};
	console.log(filterType);
	console.log(item.filters[filterType]);
	item.filters[filterType][user] = filterTo;
	console.log(item.filters);
	browser.storage.local.set({filters: item.filters});
}


function onError(error) {
	console.log(error)
}

browser.storage.local.get().then(function(item) {
	if (!item.hasOwnProperty('filters'))
		browser.storage.local.set({filters: {}});
	}, onError);

let user = "teste";
let filterTo = "pffff";
if (user != "" && filterTo != "") {
	let filterType = "words";
	let filtersGot = browser.storage.local.get("filters").then(function(item) {return onGota(filterType, user, filterTo, item)}, onError);
}

//let filters = browser.storage.local.get("filters").then(onGot, onError);