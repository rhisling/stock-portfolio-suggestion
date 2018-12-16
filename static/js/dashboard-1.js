$( function () {
	"use strict";
	$( ".peity-btc" ).peity( "line", {
		width: '100%',
		height: '100'
	} );

	$( ".peity-ltc" ).peity( "line", {
		width: '100%',
		height: '100'
	} );
	$( ".peity-neo" ).peity( "line", {
		width: '100%',
		height: '100'
	} );
	$( ".peity-dash" ).peity( "line", {
		width: '100%',
		height: '100'
	} );
	$( ".peity-eth" ).peity( "line", {
		width: '100%',
		height: '100'
	} );
	$( ".peity-xrp" ).peity( "line", {
		width: '100%',
		height: '100'
	} );


	//let arr = [6, 2, 8, 4, 3, 8, 1, 3, 6, 5, 9, 2, 8, 1, 4, 8, 9, 8, 2, 1];

	$('#recommend').on('click', function () {
		let symbols = ['AAPL', 'ADBE', 'NKE', 'GOOG', 'EBAY', 'AMZN'];

		let arr = [6, 2, 8, 4, 3, 8, 1, 3, 6, 5, 9, 2, 8, 1, 4, 8, 9, 8, 2, 1];
		$(".peity-btc").text(arr.join(',')).change();


	})
	
} );
