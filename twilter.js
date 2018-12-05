let filters = browser.storage.local.get('filters');

window.onload = function() {
	let tweets = document.getElementsByClassName('tweet');
	for (i=0, i<tweets.length; i++) {
		let tweet = tweets[i];
		let username = tweet.getAttribute('data-screen-name');
		// content é sempre segundo elemento de tweet
		// iterar sobre as children do content
		// texto vai estar na children do content com class js-tweet-text-container
		// apagar imagem (se tiver) - children do content com class AdaptativeMediaOuterContainer
	}
}