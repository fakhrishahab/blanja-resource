import $ from 'jQuery';

module = function(){
	let self = this;
	let elements = {
		staticMenu: "#staticMenu"
	};

	let init = function(){
		onScrollBody();
	};

	let onScrollBody = () => {
		$(window).on('scroll', () => {
			let fromTop = $(window).scrollTop();
			if(fromTop >= 60){
				if(!$(elements.staticMenu).hasClass('fixed')){
					$(elements.staticMenu).addClass('fixed');	
				}				
			}else{
				if($(elements.staticMenu).hasClass('fixed')){
					$(elements.staticMenu).removeClass('fixed');	
				}
			}
		});
	};

	return{
		init: init,
		onScrollBody: onScrollBody
	};
}();

module.onScrollBody();