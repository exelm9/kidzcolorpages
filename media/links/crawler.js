function Crawler(){}
var scroller;

Crawler.refine = function(){

	$('body').empty();

	var imgs = JSON.parse(window.localStorage.imgs);
		var markup = '';
	Object.keys(imgs).map(function(img_key){
		markup += '<img src="'+ imgs[img_key].src +'" data-details="'+ JSON.stringify(imgs[img_key]) +'" />';
	})

	$('body').append(markup);

	$('img').on('click', function(e){
		this.remove();
	});
}

Crawler.prune = function(xy){
	$('img').each(function(){
		if( ($('img').width() < xy +1) || ($('img').height() < xy+1)){
			$(this).remove();
		}
	})
}

Crawler.purge = function(){
	window.localStorage.imgs = window.imgs = [];
};

Crawler.stash = function(){
	window.localStorage.imgs = JSON.stringify(window.imgs);
}

Crawler.restore = function(){
	window.imgs = JSON.parse(window.localStorage.imgs);
}

Crawler.resume = function(){
	Crawler.autoScroll();
}


Crawler.parse = function(){
	window.imgs = window.imgs || {};
	setTimeout(function(){
		if( document.body.scrollTop !== 0 ){
			window.scrollBy(0, -1000);
			Crawler.parse();
		}
	},100);

	$('.browse-results-page img').each(function(){ 
		var id = $(this).closest('span').data('deviationid') || undefined;

		if(id){
		window.localStorage = window.imgs[id] = { 
				src: $(this).attr('src'),
			  	alt: $(this).attr('alt'),
			  	href: $(this).parent('a').attr('href'),
			  	title: $(this).parent('a').attr('title'),
			  	el: $(this).closest('span') 
			}
		}
	});

	console.log(Object.keys(window.imgs).length);
}

Crawler.autoScroll = function(){
	scroller = setInterval(function(){

		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	     
		if( $('body').find('End of Results').is(":visible") ){

			Crawler.killAutoScroll();
			console.log('autoscroll canceled')

			setTimeout(function(){
				Crawler.parse();
			},10);

			setTimeout(function(){
				Crawler.refine();	
			}, 100);
			
			
			console.log("click on any images you don't want")

			(function() {
			    var link = document.createElement('link');
			    link.type = 'image/x-icon';
			    link.rel = 'shortcut icon';
			    link.href = 'http://www.picgifs.com/graphics/a/alarm-lights/graphics-alarm-lights-009314.gif';
			    document.getElementsByTagName('head')[0].appendChild(link);
			}());
		}
	},1500);

	// Mark tab as done
			

	$(document).keydown(function(e) {
    // ESCAPE key pressed
    	if (e.keyCode == 27) {
        	Crawler.killAutoScroll();
        	console.log('AutoScrolling Canceled')
    	}
	});

}
Crawler.killAutoScroll = function(){
	clearTimeout(scroller);
}



// Initializer 
function addCSSRule(sheet, selector, rules, index) {
	if("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}


// Use it!
addCSSRule(document.styleSheets[0], ".browse-content img", "display:none!important");
Crawler.killAutoScroll()
Crawler.autoScroll();

