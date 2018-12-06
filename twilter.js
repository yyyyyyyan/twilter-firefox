function onError(error) {
	console.error(error);
}

function deleteMedia(tweetContent) {
	console.log('deletando');
	console.log(tweetContent);
	$(tweetContent).find('.AdaptiveMediaOuterContainer').remove();
	$(tweetContent).find('.js-media-container').remove();
	$(tweetContent).find('.QuoteTweet').remove();
}

function filter(item) {
	let tweets = $('.tweet:not(.twilter-filtered)');
	tweets.each(function() {
		let username = $(this).attr('data-screen-name');
		if (username == undefined)
			return true;
		let textTag = $(this).find('.content').find('.js-tweet-text-container').find('.tweet-text');
		if (username.toLowerCase() in item.filters.users) {
			console.log('uhu');
			textTag.text(item.filters.users[username]);
			deleteMedia($(this).find('.content'));
		} else {
			for (var property in item.filters.words) {
				if (textTag.text().toLowerCase().includes(property.toLowerCase())) {
					textTag.text(item.filters.words[property]);
					deleteMedia($(this).find('.content'));
				}
			}
		}
		console.log('foi');
		$(this).addClass('twilter-filtered');
	});
}

console.log('rato');
$(document).ready(function() {
	console.log('aaaaaaa');
	let filters = browser.storage.local.get('filters').then(function(item){
		setInterval(function(){filter(item);}, 7000);
	}, onError);
});