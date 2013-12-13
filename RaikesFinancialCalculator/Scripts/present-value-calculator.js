var pvCashFlow = $('#pv-cash-flow');
var pvYield = $('#pv-yield');
var maturity = $('#pv-maturity');
var compounded = $('#pv-compounded');
var presentValue = $('#pv-present-value');
var initialInvestment = $('#pv-initial-investment');
initialInvestment.val(0);

var C, y, P, M;

pvCashFlow.keyup(_.debounce(function() {
	//Allow for multiple cash flows
	//No field validation
	C = pvCashFlow.val();

	evaluateFormula();
}, 800));

pvYield.keyup(_.debounce(function() {
	if(!isNaN(pvYield.val())) {
		y = pvYield.val();
		evaluateFormula();
	}
}, 800));

presentValue.keyup(_.debounce(function() {
	if(!isNaN(presentValue.val())) {
		P = presentValue.val();
		evaluateFormula();
	}
}, 800));

maturity.keyup(_.debounce(function() {
	if(!isNaN(maturity.val())) {
		M = maturity.val();
		evaluateFormula();
	}
}, 800));
compounded.keyup(_.debounce(evaluateFormula, 800));
initialInvestment.keyup(_.debounce(evaluateFormula, 800));

function canSolve() {
	if((P || y) && C) {
		return true;
	}
		
	return false;
}

function evaluateFormula() {
	if(!canSolve()) {
		return false;
	}

	var m = !isNaN(compounded.val()) && compounded.val() ? compounded.val() : 1;
	M = !isNaN(maturity.val()) && maturity.val() ? maturity.val() : 1;
	var flows = C.split(',');
	var max = flows.length;

	if(y && !presentValue.is(':focus')) {
		P=0;
		for(var i=0; i<M; i++) {
			if(i>=max) {
				P += (flows[max - 1]/Math.pow(1 + (y/m), i+1));
			}
			else {
				P += (flows[i]/Math.pow(1 + (y/m), i+1));
			}
		}
		
		if(initialInvestment.val() && !isNaN(initialInvestment.val())) {
			P-=initialInvestment.val();
		}

		presentValue.val(accounting.formatMoney(P));
	}
	else if (P && !pvYield.is(':focus')) {
		y = 0.5;
		var test = 0;
		while (Math.abs(test - P) > 0.01) {
			//Evaluate summation
			test = 0;
			for(var i=0; i<M; i++) {
				if(i>=max) {
					test += (flows[max - 1]/Math.pow(1 + (y/m), i+1));
				}
				else {
					test += (flows[i]/Math.pow(1 + (y/m), i+1));
				}
			}

			if(initialInvestment.val() && !isNaN(initialInvestment.val())) {
				test-=initialInvestment.val();
			}

			//Adjust y for next test
			if(test > P) {
				y+=0.0001;
			}
			else {
				y-=0.0001;
			}
		}

		pvYield.val(y.toFixed(2));
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