/**
 * Suggestions
 * Copyright(c) 2012 Ta�aut
 * MIT Licensed
 */
define("Navigation", ["Olives/Event-plugin", "Olives/OObject", "Routing", "Config"],
		
function (EventPlugin, OObject, Routing, Config) {
	
	/**
	 * Defines the navigation bar UI
	 * The template is taken from the dom and given by the main app
	 */
	return function NavigationConstructor() {
		
		// An OObject based UI
		var navigation = new OObject;
		
		// The function called by the navigation bar when a menu is clicked
		navigation.show = function (event, node) {
			Routing.get(node.href.split("#").pop());
		};
		
		// The function that messes with the .active class, triggered on location change
		Routing.watch(function (menu) {
			var selected = this.template.querySelector("li a[href='#" + menu + "']");
			this.template.querySelector("li.active").classList.remove("active");
			selected && selected.parentNode.classList.add("active");
		}, navigation);
		
		// The dom requires an EventPlugin to handle clicks
		navigation.plugins.add("event", new EventPlugin(navigation));
		
		// And finally create the UI from the dom
		navigation.alive(Config.get("navbarUI"));
		
		return navigation;
		
	};
	
});