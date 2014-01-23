$.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
                if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                                o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                } else {
                        o[this.name] = this.value || '';
                }
        });
        return o;
};


var HomeView = Backbone.View.extend({
	render: function() {
		$.get('templates/home.html', function(incomingTemplate){
			var template = Handlebars.compile(incomingTemplate);
			$('#top').html(template).trigger('create');
		})
		return this;
	}
});

var MenuView = Backbone.View.extend({

	render: function() {
		$.get('templates/menu.html', function(incomingTemplate){
			var template = Handlebars.compile(incomingTemplate);
			$('#sidebar-wrapper').html(template).trigger('create');
		})
		return this;
	}
});

var CarouselView = Backbone.View.extend({
	render: function() {

		var template =    
		"<div class='item'><a href='#'><img src='img/portfolio-1.jpg' alt='img'></a></div>"+
		"<div class='item'><a href='#'><img src='img/portfolio-2.jpg' alt='img'></a></div>"+ 
		"<div class='item'><a href='#'><img src='img/portfolio-3.jpg' alt='img'></a></div>"+
		"<div class='item'><a href='#'><img src='img/portfolio-4.jpg' alt='img'></a></div>";

		$('#carousel').html(template).trigger('create');
		$('#carousel').owlCarousel({
			autoPlay: 3000,
			items: 4,
			loop: true
		});

	}
});

var LoginView = Backbone.View.extend({
	el: 'body',
	events: {
	},
	render: function() {
		$.get('templates/login.html', function(incomingTemplate){
			var template = Handlebars.compile(incomingTemplate);
			$('#login').html(template).trigger('create');
		})
		return this;
	},
});

var ServicesView = Backbone.View.extend({
	render: function() {
		$.get('templates/services.html', function(incomingTemplate){
			var template = Handlebars.compile(incomingTemplate);
			$('#services').html(template).trigger('create');
		})
		return this;
	}
});

var GalleryView = Backbone.View.extend({
	render: function() {
		$.get('templates/gallery.html', function(incomingTemplate){
			var template = Handlebars.compile(incomingTemplate);
			$('#gallery').html(template).trigger('create');
		})
		return this;
	}
});

var ContactView = Backbone.View.extend({
	render: function() {
		$.get('templates/contact.html', function(incomingTemplate){
			var template = Handlebars.compile(incomingTemplate);
			$('#contact').html(template).trigger('create');
		})
	}
});

var FooterView = Backbone.View.extend({
	render: function() {
		$.get('templates/footer.html', function(incomingTemplate){
			var template = Handlebars.compile(incomingTemplate);
			$('#footer').html(template).trigger('create');
		})
	}
});


