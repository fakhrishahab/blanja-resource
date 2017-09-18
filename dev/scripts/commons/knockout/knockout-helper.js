import $ from 'jquery';
import ko from './knockout-3.4.1';
// console.log('helper')
module.exports = (function(){
	ko.bindingHandlers.numeric = {
		    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		    	var DEFAULT_MAX_LENGTH = 10000000;
	            var minLength = 0;
		    	var maxLength = ko.utils.unwrapObservable(allBindingsAccessor().trimTextLength) || DEFAULT_MAX_LENGTH;
	            if (maxLength < minLength) {
	            	maxLength = minLength;		            	
	            } 

		        $(element).on("keydown", function (event) {
		        	
		        	
		            // Allow: backspace, delete, tab, escape, and enter
		            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
		                // Allow: Ctrl+A
		                (event.keyCode == 65 && event.ctrlKey === true) ||
		                // Allow: home, end, left, right
		                (event.keyCode >= 35 && event.keyCode <= 39)) {
		                // let it happen, don't do anything
		            	
		                return;
		            }
		            else {
		                // Ensure that it is a number and stop the keypress
		                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
		                	event.preventDefault();
		                } else {
		                	if((event.target && event.target.value && event.target.value.length >= maxLength)) {
		                		event.preventDefault();
		                	}
		                }
		            }
		        });
		    }
		};
	
	ko.bindingHandlers.alpha_numeric = {
	    init: function (element, valueAccessor) {
	    	
	        $(element).on("keydown keypress keyup", function (event) {

	        	// Allow: backspace, delete, tab, escape, and enter        	
	            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
	                // Allow: Ctrl+A
	                (event.keyCode == 65 && event.ctrlKey === true) ||
	                // Allow: space, f5
	                (event.keyCode == 32 || event.keyCode == 116) ||
	                // Allow: number
	                (event.keyCode >= 35 && event.keyCode <= 39) ||
	                //allow a-z
	                (event.keyCode >= 65 && event.keyCode <= 90) 
	                // allow - _ &
	                || (event.keyCode == 189 || event.keyCode == 95 || event.keyCode == 55)
	            ) {
	                // let it happen, don't do anything
	                return;
	            }
	            else {
	            	// Ensure that it is a number and stop the keypress
	                if (event.shiftKey || ((event.keyCode < 48 || (event.keyCode > 57 )) && (event.keyCode < 94 && event.keyCode === 189 || event.keyCode > 122)  ) ) {
	                    event.preventDefault();
	                }
	            }
	            

	        });
	    }
	};
	
})();