function createLi(toFilter, filterTo) {
	let li = document.createElement('li');
	let liText = document.createTextNode(toFilter + " - " + filterTo);
	li.appendChild(liText);
	li.setAttribute('id', toFilter);

	let removeBtn = document.createElement('a');
	removeBtn.setAttribute('href', '#');
	let removeIcon = document.createElement('i');
	removeIcon.setAttribute('class', 'material-icons');
	let removeText = document.createTextNode('delete');
	removeIcon.appendChild(removeText)
	removeBtn.appendChild(removeIcon);
	removeBtn.setAttribute('class', 'removeBtn');

	removeBtn.onclick = function() {
		let filterToRemove = this.parentElement.id;
		let filterType = this.parentElement.parentElement.id;
		browser.storage.local.get('filters').then(function(item){return removeFilter(filterType, filterToRemove, item)}, onError);
		this.parentElement.outerHTML = '';
	}

	li.appendChild(removeBtn);
	console.log('lalala');
	return li;
}

function removeFilter(filterType, filterToRemove, item) {
	delete item.filters[filterType][filterToRemove];
	browser.storage.local.set({filters: item.filters});
}

function setFilter(filterType, toFilter, filterTo, item) {
	item.filters[filterType] = item.filters.hasOwnProperty(filterType) ? item.filters[filterType] : {};
	item.filters[filterType][toFilter] = filterTo;
	browser.storage.local.set({filters: item.filters});
	let ul = document.getElementById(filterType);
	let li = createLi(toFilter, filterTo);
	ul.appendChild(li);
}

function listFilters(item) {
	const uls = ['users', 'words'];
	uls.forEach(function(list, index){
		let ul = document.getElementById(list);
		for (var property in item.filters[list]) {
			let li = createLi(property, item.filters[list][property]);
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
};

document.getElementById('clearBtn').onclick = function() {
	browser.storage.local.clear();
	browser.storage.local.set({filters: {words: {}, users: {}}});
	const uls = ['users', 'words'];
	uls.forEach(function(list, index){
		let ul = document.getElementById(list);
		while (ul.firstChild)
			ul.removeChild(ul.firstChild);
	});
};

browser.storage.local.get("filters").then(listFilters, onError);