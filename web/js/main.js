(function (App) {
	App.populator('home', function (page) {
		var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		$(page).on('appShow', function() {
			$('.placeholder').css('width', width/2 - 10)
			$('.placeholder').css('height', width/2 - 10)
		})
	});

	App.populator('upload', function (page) {
		// put stuff here
	});

	try {
		App.restore();
	} catch (err) {
		App.load('home');
	}
})(App);
