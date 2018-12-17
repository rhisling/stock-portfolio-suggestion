user_amount = 0;
stock_amount = {};
let resultArray = [];
let vishal_sum_stock = [0,0,0,0,0,0,0,0,0,0];
let vishal_date = undefined;

let count = 0;

const json = {
	"Ethical Investing": [{
		"name": "AAPL",
		"portion": 40
	}, {
		"name": "ADBE",
		"portion": 30
	}, {
		"name": "GOOG",
		"portion": 30
	}],
	"Growth Investing": [{
		"name": "EBAY",
		"portion": 25
	}, {
		"name": "MSFT",
		"portion": 40
	}, {
		"name": "AMZN",
		"portion": 35
	}],
	"Index Investing": [{
		"name": "IBM",
		"portion": 40
	}, {
		"name": "TWTR",
		"portion": 30
	}, {
		"name": "CDNS",
		"portion": 30
	}],
	"Quality Investing": [{
		"name": "FB",
		"portion": 25
	}, {
		"name": "WMT",
		"portion": 35
	}, {
		"name": "JCI",
		"portion": 40
	}],
	"Value Investing": [{
		"name": "TSLA",
		"portion": 30
	}, {
		"name": "BBY",
		"portion": 30
	}, {
		"name": "PYPL",
		"portion": 40
	}]
};

const symbolNameLogoMap = {
	'AAPL': {
		'icon': 'fab fa-apple fa-3x',
		'sname': 'Apple Inc.'
	},
	'ADBE': {
		'icon': 'fab fa-adobe fa-3x',
		'sname': 'Adobe Inc.'
	},
	'GOOG': {
		'icon': 'fab fa-google fa-3x',
		'sname': 'Alphabet Inc.'
	},
	'MSFT': {
		'icon': 'fab fa-microsoft fa-3x',
		'sname': 'Microsoft Corp'
	},
	'EBAY': {
		'icon': 'fab fa-ebay fa-3x',
		'sname': 'eBay Inc.'
	},
	'AMZN': {
		'icon': 'fab fa-amazon fa-3x',
		'sname': 'Amazon.com'
	},
	'IBM': {
		'icon': 'fas fa-laptop fa-3x',
		'sname': 'IBM'
	},
	'CDNS': {
		'icon': 'fas fa-microchip fa-3x',
		'sname': 'Cadence Sys'
	},
	'TWTR': {
		'icon': 'fab fa-twitter fa-3x',
		'sname': 'Twitter Inc.'
	},
	'FB': {
		'icon': 'fab fa-facebook fa-3x',
		'sname': 'Facebook Inc.'
	},
	'JCI': {
		'icon': 'fas fa-memory fa-3x',
		'sname': 'Johnson Ctrls'
	},
	'WMT': {
		'icon': 'fas fa-shopping-cart fa-3x',
		'sname': 'Walmart Inc.'
	},
	'TSLA': {
		'icon': 'fas fa-car fa-3x',
		'sname': 'Tesla Inc.'
	},
	'BBY': {
		'icon': 'fas fa-bolt fa-3x',
		'sname': 'Best Buy Co'
	},
	'PYPL': {
		'icon': 'fab fa-paypal fa-3x',
		'sname': 'Paypal Inc.'
	}

};

function checkForm() {
	count = 0;
	resultArray = [];
	vishal_sum_stock = [0,0,0,0,0,0,0,0,0,0];
	stock_amount = {}
	$('#charts').empty();
	let amount = $('#amount').val();
	console.log(amount);
	user_amount = amount;

	let selected = [];
	$('#checkboxes input:checked').each(function () {
		selected.push($(this).attr('value'));
	});

	if(amount < 5000){
		alert('Amount should be greater than 5000');
		return;
	}

	if (selected.length > 2) {
		//alert('You can only select atmost 2 strategies');
		return;
	}



	for (let i = 0; i < selected.length; i++) {
		console.log(json[selected[i]]);

		for (let j = 0; j < json[selected[i]].length; j++) {
			resultArray.push(json[selected[i]][j]['name']);
			stock_amount[json[selected[i]][j]['name']] = json[selected[i]][j]['portion']/100.0 * user_amount /selected.length;

		}

	}
	console.log(stock_amount);
	console.log(json);
	console.log(selected);
	console.log(resultArray);
	resultArray.forEach((sym) => {
		doAjax(sym);
	});
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
			count++;
			$('#charts').append(createCard(data));
			$("." + data['symbol']).peity("line", {
				width: '100%',
				height: '100'
			});
			console.log("charts+" + data['charts']);
			console.log("vishal+" + data['vishal']);

			if(!vishal_date){
				vishal_date = data['vishal'].slice(0,10);
			}

			for(let i = 0; i < 10; i++){
				vishal_sum_stock[i] += data['charts'][i];
			}


			console.log('vishal_sum_stock'+ vishal_sum_stock);
			console.log('vishal_date'+ vishal_date);

			console.log(vishal_date.length, vishal_sum_stock.length);

			let arr = data['charts'];
			$('.' + 'symbol').text(arr.join(',')).change();

			console.log(count, resultArray.length);

			if(count === resultArray.length){
				console.log('HHHHHHHHHHHH');
				do_vishal_charts();
			}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('error ' + textStatus + ' ' + errorThrown);
		}
	});
	return result;
}

$( function () {
	"use strict";
	$('#charts').empty();
	 $('input[type=checkbox]').prop("checked", false);
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

	$('input[type=checkbox]').on('change', function (e) {
		if ($('input[type=checkbox]:checked').length > 2) {
			$('#reco-button').addClass('sweet-wrong');
		} else {
			$('#reco-button').removeClass('sweet-wrong');
		}
	});

	$('#reco-button').on('click', function () {
		if($('#reco-button').hasClass('sweet-wrong')){
			swal("Oops...", "You have selected more than 2 strategies !!", "info");
		}
		checkForm();
	});

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
	let name = symbolNameLogoMap;
	console.log("Name length:" + data['name'].length);
	if (data.name.length > 14) {
		let words = data['name'].split(" ");
		if (words.length >= 2 && (words[0].length + words[1].length) < 9)
			name = words[0] + " " + words[1];
		else
			name = words[0];
	} else
		name = data['name'];

	name = symbolNameLogoMap[data.symbol]['sname'];
	let colorForGraph = randomColor({luminosity: 'light', hue: '#6244CE'});
	let colorForGraphFill = randomColor({luminosity: 'light', hue: colorForGraph, alpha: 0.3});
	// let icon = getLogo(data['symbol']);
	let icon = symbolNameLogoMap[data.symbol]['icon'];
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
		'                                        <h3>$' + data.price.toFixed(2)  + '</h3>\n' +
		'                                        <h6 class="' + color + '">' + data.change_percent + '% <i\n' +
		'                                                class="' + arrow + ' f-s-16' + color + 'm-l-5"></i></h6>\n' +
		'                                    </div>\n' +
		'                                </div>\n' +
		'                                <div class="m-t-15">\n' +
		'                                    <span class="' + data.symbol + '"\n' +
		'                                          data-peity=\'{ "fill": "' + colorForGraphFill + '", "stroke": "' + colorForGraph + '"}\'>' + fArr.join(',') + '</span>\n' +
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

function getRandomColor() {
return "rgba(" + Math.floor(Math.random() * 255) + ","
                  + Math.floor(Math.random() * 255) + ","
                  + Math.floor(Math.random() * 255) + ",0.2)";

}

function do_vishal_charts(){

	console.log(vishal_date,vishal_sum_stock);


	let mov = vishal_sum_stock[9];

	mov = user_amount/mov;

	for(let p = 0 ; p < 10; p++){
		vishal_sum_stock[p] = vishal_sum_stock[p]*mov;
	}

	console.log(vishal_sum_stock);


	Highcharts.chart('vishal-container-line', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'PORTFOLIO PAST PERFORMANCE'
    },
    subtitle: {
        text: 'Performace in the last 10 days'
    },
    xAxis: {
        categories: vishal_date
    },
    yAxis: {
        title: {
            text: 'Price ($)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true,
								format: '{point.y:.2f} ',
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Portfolio trend line',
        data: vishal_sum_stock
    }]
	});



	console.log(stock_amount);
	const donut_data = [];
	console.log(Object.keys(stock_amount));
 	let keys = Object.keys(stock_amount)

	keys.forEach( item => {
		donut_data.push({
			name : item,
			y : stock_amount[item]
		});
	})

	console.log(donut_data);


	console.log('hfsdfh');



	Highcharts.chart('vishal-container-donut', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'PORTFOLIO RATIO'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.y:.2f}',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: donut_data
    }]
});


}
