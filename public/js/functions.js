var app = {
	likeIdea: function() {
		var id = $('#likeBtn').parent().attr('id');
		if(localStorage.getItem(id) == 'true') {
			document.getElementById('likeBtn').disabled='true';
		}
		$('html').on('click', '#likeBtn', function() {
			if(localStorage.getItem(id) == 'true') {
				console.log('disable');
				document.getElementById('likeBtn').disabled='true';
			}
			console.log(id);
			$.ajax({
				type: 'GET',
				url: '/like:' + id,
				datatype: 'jsonp',
				success: function() {
					localStorage.setItem(id, 'true')
					document.getElementById('votemsg').innerHTML = 'Thanks for voting!';
					document.getElementById('likeBtn').disabled='true';
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