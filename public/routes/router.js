
var Router = Backbone.Router.extend({
	routes: {
		'/': 'index'
	}
})

var app_router = new Router();

app_router.on('route:index', function() {
});