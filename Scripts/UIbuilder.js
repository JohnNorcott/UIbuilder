(function ($, window, undefined) {

var UIbuilder = window.UIbuilder = function(model) {
	return new UIbuilder.prototype.init(model);
}

UIbuilder.prototype = {
	constructor: UIbuilder,
	
	init: function(model) {
		this.fieldNames = [];
		this.viewModel = {};
		for (var prop in model) {
			if(model.hasOwnProperty(prop)) {
				this.viewModel[prop] = ko.observable(model[prop]);
				this.fieldNames.push(prop);
			}
		}
		
		return this;
	},
	
	grid : function(elemId) {
		elemId = makejQueryable(elemId);
		var gridElem = $(elemId);
		if(gridElem.length) {
			var gridSiblingElem = gridElem.prev();
			if(!gridSiblingElem.length) {
				gridSiblingElem = $('<span></span>');
				gridElem.before(gridSiblingElem);
			}
			gridElem.remove();
		}
		
		gridElem = $("<table class='uib_grid'></table>").attr('id', elemId.replace('#', '')).insertAfter(gridSiblingElem);
		var headerRow = $("<tr id='header'></tr>").appendTo(gridElem);
		for (var i = 0; i < this.fieldNames.length; i++) {
			headerRow.append("<td>" + this.fieldNames[i] + "</td>");			
		}
		
		var gridRow = $('<tr></tr>').appendTo(gridElem);
		for (var i = 0; i < this.fieldNames.length; i++) {
			gridRow.append("<td data-bind='text: " + this.fieldNames[i] + "'></td>");
		}
		
		ko.applyBindings(this.viewModel);		
	}
}

function makejQueryable(elemId) {
	elemId = elemId.replace('#', '');
	return '#' + elemId;
}

UIbuilder.prototype.init.prototype = UIbuilder.prototype;
})(jQuery, window);