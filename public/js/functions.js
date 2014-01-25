var app = {
	likeIdea: function() {
		$('html').on('click', '#likeBtn', function() {
			var id = $(this).parent().attr('id');
			console.log(id);
			$.ajax({
				type: 'GET',
				url: '/like:' + id,
				datatype: 'jsonp',
				success: function() {
					document.getElementById('votemsg').innerHTML = 'Thanks for voting!';
				},
				error: function() {
					console.log('fail');
				}
			})
		})
	},

	init:jQuery(function($) {
		app.likeIdea();
	})	
};