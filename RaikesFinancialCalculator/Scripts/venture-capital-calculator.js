var numberOfRounds = $('#rounds');
var investedFunds = $('#invested-funds');
var requiredROI = $('#req-roi');
var yearsToExit = $('#years-to-exit');
var priceToEarnings = $('#pe');
var earningsAtExit = $('#earnings-at-exit');

var numRounds, invFunds, roi, toExit, pe, atExit;

numberOfRounds.keyup(_.debounce(function() {
	if(!isNaN(numberOfRounds.val())) {
		numRounds = numberOfRounds.val();
		evaluateFormula();
	}	
}, 800));

investedFunds.keyup(_.debounce(function() {
	if(!isNaN(investedFunds.val())) {
		invFunds = investedFunds.val();
		evaluateFormula();	
	}
}, 800));

requiredROI.keyup(_.debounce(function() {
	if(!isNaN(requiredROI.val())) {
		roi = requiredROI.val();
		evaluateFormula();
	}
}, 800));

yearsToExit.keyup(_.debounce(function() {
	if(!isNaN(yearsToExit.val())) {
		toExit = yearsToExit.val();
		evaluateFormula();
	}
}, 800));

priceToEarnings.keyup(_.debounce(function() {
	if(!isNaN(priceToEarnings.val())) {
		pe = priceToEarnings.val();
		evaluateFormula();
	}
}, 800));

earningsAtExit.keyup(_.debounce(function() {
	if(!isNaN(earningsAtExit.val())) {
		atExit = earningsAtExit.val();
		evaluateFormula();
	}
}, 800));

//bondsMaturity.keyup(_.debounce(evaluateFormula, 800));
//bondsCompounded.keyup(_.debounce(evaluateFormula, 800));

function canSolve() {
	if(true) {
		return true;
	}
		
	return false;
}

function evaluateFormula() {
	if(!canSolve()) {
		return false;
	}
}

$('#reset-btn').live('click',function(e){
	e.preventDefault();
	$('input').val('');

	//Null the stored inputs later!
});