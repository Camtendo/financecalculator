var cashFlow = $('#a-cash-flow');
var yield = $('#a-yield');
var maturity = $('#a-maturity');
var compounded = $('#a-compounded');
var presentValue = $('#a-present-value');

var C, y, P, M;

cashFlow.keyup(_.debounce(function() {
	if(!isNaN(cashFlow.val())) {
		C = cashFlow.val();
		evaluateFormula();
	}
}, 800));

yield.keyup(_.debounce(function() {
	if(!isNaN(yield.val())) {
		y = yield.val();
		evaluateFormula();
	}
}, 800));

presentValue.keyup(_.debounce(function() {
	if(!isNaN(presentValue.val())) {
		P = presentValue.val();
		evaluateFormula();
	}
}, 800));

maturity.keyup(_.debounce(evaluateFormula, 800));
compounded.keyup(_.debounce(evaluateFormula, 800));

function canSolve() {
	if((P && C) || (P && y) || (C && y)) {
		return true;
	}
		
	return false;
}

function evaluateFormula() {
	if(!canSolve()) {
		return false;
	}

	var m = !isNaN(compounded.val()) && compounded.val() ? compounded.val() : 1;
	var M = !isNaN(maturity.val()) && maturity.val() ? maturity.val() : 1;
		
	if(C && y && !presentValue.is(':focus')) {
		P = ((C * m) / y) * (1 - Math.pow(1 + (y / m), (-1 * M)));
		presentValue.val(accounting.formatMoney(P));
	}
	else if(P && y && !cashFlow.is(':focus')) {
		C = (P * (y / m) * Math.pow(1+(y / m), M)) / (Math.pow(1 + (y / m), M) - 1);
		cashFlow.val(accounting.formatMoney(C));
	}
	else if(P && C && !yield.is(':focus')) {
		y = 0.5;
		var test = 0;
		while (Math.abs(test - P) > 0.01) {
			test = ((C * m) / y) * (1 - Math.pow(1 + (y / m), (-1 * M)));

			if(test > P) {
				y+=0.0001;
			}
			else {
				y-=0.0001;
			}
		}

		yield.val(y.toFixed(2));
	}
}

$('#reset-btn').live('click',function(e){
	e.preventDefault();
	$('input').val('');
	C=null; 
	y=null; 
	P=null; 
	M=null;
});