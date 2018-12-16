const json = {
	"Ethical Investing": [{
		"name": "AAPL",
		"portion": "40"
	}, {
		"name": "ADBE",
		"portion": "30"
	}, {
		"name": "GOOG",
		"portion": "30"
	}],
	"Growth Investing": [{
		"name": "EBAY",
		"portion": "25"
	}, {
		"name": "MSFT",
		"portion": "40"
	}, {
		"name": "AMZN",
		"portion": "35"
	}],
	"Index Investing": [{
		"name": "IBM",
		"portion": "40"
	}, {
		"name": "TWTR",
		"portion": "30"
	}, {
		"name": "CDNS",
		"portion": "30"
	}],
	"Quality Investing": [{
		"name": "FB",
		"portion": "25"
	}, {
		"name": "WMT",
		"portion": "35"
	}, {
		"name": "JCI",
		"portion": "40"
	}],
	"Value Investing": [{
		"name": "TSLA",
		"portion": "30"
	}, {
		"name": "BBY",
		"portion": "30"
	}, {
		"name": "PYPL",
		"portion": "40"
	}]
};


function checkForm() {
	$('#charts').empty();
	let amount = $('#amount').val();
	console.log(amount);

	let selected = [];
	$('#checkboxes input:checked').each(function () {
		selected.push($(this).attr('value'));
	});

	if (selected.length > 2) {
		alert('You can only select atmost 2 strategies');
		return;
	}

	let resultArray = [];

	for (let i = 0; i < selected.length; i++) {
		console.log(json[selected[i]]);

		for (let j = 0; j < json[selected[i]].length; j++) {
			resultArray.push(json[selected[i]][j]['name']);
		}

	}

	console.log(json);
	console.log(selected);
	console.log(resultArray);
	//let keys = ['TI03TLBOD4DORV4V', '7FCZB2RJ2FI9CNEJ', 'VQKAZERBK13GBYD6', 'N8GNU3T4WVMLKXGH', 'C3UMGJ3EA980AWMZ', 'LEZFOUWRRFGOT5KM'];
	//let i = 0;

	resultArray.forEach((sym) => {
		doAjax(sym);
		//i++;
	});
	let arr1 = [6, 2, 8, 4, 3, 8, 1, 3, 6, 5, 9, 2, 8, 1, 4, 8, 9, 8, 2, 1];
	// datas.forEach((data) => {
	// 	$('#charts').append(createCard(data));
	//
	// 	$("." + data['symbol']).peity("line", {
	// 		width: '100%',
	// 		height: '100'
	// 	});
	// 	console.log("charts+" + data['charts']);
	// 	let arr = data['charts'];
	// 	$('.' + 'symbol').text(arr.join(',')).change();
	//
	// });

	$(".peity-btc").text(arr1.join(',')).change();

}

function doAjax(cmp) {
	let result = {};
	$.ajax({
		url: '/trends',
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify({'symbol': cmp}),
		contentType: 'application/json',
		success: function (data) {

			console.log("results:" + JSON.stringify(data));

			//create chart
			$('#charts').append(createCard(data));
			$("." + data['symbol']).peity("line", {
				width: '100%',
				height: '100'
			});
			console.log("charts+" + data['charts']);
			let arr = data['charts'];
			$('.' + 'symbol').text(arr.join(',')).change();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('error ' + textStatus + ' ' + errorThrown);
		}
	});
	return result;
}

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


function createCard(data) {
	let color = parseInt(data.change_percent) > 0 ? "text-success" : "text-danger";
	let arrow = parseInt(data.change_percent) > 0 ? "ti-arrow-up" : "ti-arrow-down";

	let arr = data['charts'];
	let sum = 0;
	arr.forEach(ele => {
		sum += ele;
	});
	let mean = sum / arr.length;
	let fArr = [];
	arr.forEach((ele) => {
		fArr.push(Math.abs(ele - mean));
	});
	let name;
	console.log("Name length:" + data['name'].length);
	if (data.name.length > 14) {
		let words = data['name'].split(" ");
		name = words[0];
	} else
		name = data['name'];

	let icon = getLogo(data['symbol']);
	let cardTemplate = '<div class="col-lg-4">\n' +
		'                    <div class="card">\n' +
		'                        <div class="card-body">\n' +
		'                            <div class="stat-widget-seven">\n' +
		'                                <div class="row">\n' +
		'                                    <div class="col-2">\n' +
		'                                      <i class="' + icon + '" title="BTC"></i>' +
		'                                      \n' +
		'                                    </div>\n' +
		'                                    <div class="col-5">\n' +
		'                                        <h3 id="name">' + name + '</h3>\n' +
		'                                        <h6 class="text-muted"><span\n' +
		'                                                class="text-info">' + data.change + '</span></h6>\n' +
		'                                    </div>\n' +
		'                                    <div class="col-5 text-right">\n' +
		'                                        <h3>$' + data.price + '</h3>\n' +
		'                                        <h6 class="' + color + '">' + data.change_percent + '% <i\n' +
		'                                                class="' + arrow + ' f-s-16' + color + 'm-l-5"></i></h6>\n' +
		'                                    </div>\n' +
		'                                </div>\n' +
		'                                <div class="m-t-15">\n' +
		'                                    <span class="' + data.symbol + '"\n' +
		'                                          data-peity=\'{ "fill": "rgba(247, 147, 26, 0.5)", "stroke": "#f7931a"}\'>' + fArr.join(',') + '</span>\n' +
		'                                </div>\n' +
		'                            </div>\n' +
		'                    </div>\n' +
		'             </div>\n' +
		'    </div>';

	return cardTemplate;
}


function getLogo(sym) {
	switch (sym) {
		case 'AAPL':
			return 'fab fa-apple fa-3x';
		case 'ADBE':
			return 'fab fa-adobe fa-3x';
		case 'GOOG':
			return 'fab fa-google fa-3x';
		case 'MSFT':
			return 'fab fa-microsoft fa-3x';
		case 'EBAY':
			return 'fab fa-ebay fa-3x';
		case 'AMZN':
			return 'fab fa-amazon fa-3x';
		case 'TWTR':
			return 'fab fa-twitter fa-3x';
		case 'FB':
			return 'fab fa-facebook fa-3x';
		case 'PYPL':
			return 'fab fa-paypal fa-3x';
	}

}