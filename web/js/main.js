(function (App) {
	App.populator('home', function (page) {
		// put stuff here
	});

	App.populator('page2', function (page) {
		// put stuff here
	});

	try {
		App.restore();
	} catch (err) {
		App.load('home');
	}
})(App);
