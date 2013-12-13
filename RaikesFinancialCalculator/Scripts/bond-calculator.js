var bondsFaceValue = $('#bonds-face-value');
var bondsCouponPayment = $('#bonds-coupon-payment');
var bondsYield = $('#bonds-yield');
var bondsMaturity = $('#bonds-maturity');
var bondsCompounded = $('#bonds-compounded');
var bondsPrincipal = $('#bonds-principal');

var F, C, y, P;

bondsFaceValue.keyup(_.debounce(function() {
	if(!isNaN(bondsFaceValue.val())) {
		F = bondsFaceValue.val();
		evaluateFormula();
	}	
}, 800));

bondsCouponPayment.keyup(_.debounce(function() {
	if(!isNaN(bondsCouponPayment.val())) {
		C = bondsCouponPayment.val();
		evaluateFormula();	
	}
}, 800));

bondsYield.keyup(_.debounce(function() {
	if(!isNaN(bondsYield.val())) {
		y = bondsYield.val();
		evaluateFormula();
	}
}, 800));

bondsPrincipal.keyup(_.debounce(function() {
	if(!isNaN(bondsPrincipal.val())) {
		P = bondsPrincipal.val();
		evaluateFormula();
	}
}, 800));

bondsMaturity.keyup(_.debounce(evaluateFormula, 800));
bondsCompounded.keyup(_.debounce(evaluateFormula, 800));

function canSolve() {
	if(((P && C) || (P && y) || (C && y)) && F) {
		return true;
	}
		
	return false;
}

function evaluateFormula() {
	if(!canSolve()) {
		return false;
	}

	var m = !isNaN(bondsCompounded.val()) && bondsCompounded.val() ? bondsCompounded.val() : 1;
	var M = !isNaN(bondsMaturity.val()) && bondsMaturity.val() ? bondsMaturity.val() : 1;

	if(C && y && !bondsPrincipal.is(':focus')) {
		P = C * ((1 / (y / m)) - (1 / ((y/m) * Math.pow((1 + (y / m)), M)))) + (F / Math.pow((1 + (y / m)), M));
		bondsPrincipal.val(accounting.formatMoney(P));
	}
	
	else if(P && y && !bondsCouponPayment.is(':focus')) {
		C= (P - (F / Math.pow((1 + (y / m)), M))) / ((1 / (y / m)) - (1 / ((y/m) * Math.pow((1 + (y / m)), M))));
		bondsCouponPayment.val(accounting.formatMoney(C));
	}
	else if(P && C && !bondsYield.is(':focus')) {
		y = 0.5;
		var test = 0;
		while (Math.abs(test - P) > 0.01) {
			test = C * ((1 / (y / m)) - (1 / ((y/m) * Math.pow((1 + (y / m)), M)))) + (F / Math.pow((1 + (y / m)), M));

			if(test > P) {
				y+=0.0001;
			}
			else {
				y-=0.0001;
			}
		}

		bondsYield.val(y.toFixed(2));
	}
}

$('#reset-btn').live('click',function(e){
	e.preventDefault();
	$('input').val('');
	F=null;
	C=null; 
	y=null; 
	P=null;
});