var app = {
	initialize: function() {
		this.likeIdea();
		console.log('Initialize');
	},

	likeIdea: function() {
		$('html').on('dblclick', '.idea', function() {
			alert('clicked');
		});
	}
	
}