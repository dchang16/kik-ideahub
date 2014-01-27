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

	filterFeed: function() {
		$('html').on('click', '#popular', function() {
			window.location.href='/mainpopular';
		})
		$('html').on('click', '#newest', function() {
			window.location.href='/main';
		})
	},

	checkUpload: function() {
		$('#uploadIdea').submit(function(ev) {
			ev.preventDefault();
			var idea = document.getElementById('ideatxt');
			var pitch = document.getElementById('pitchtxt');
			if(idea.value == '') {
				alert('Please enter your idea title');
			}
			else if(pitch.value == '') {
				alert('Please enter your pitch');
			}
			else {
				document.getElementById('uploadIdea').submit();
			}
		})
	},


	init:jQuery(function($) {
		app.likeIdea();
		app.filterFeed();
		app.checkUpload();
	})	
};