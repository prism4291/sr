// divide but avoid divide by 0 error
SR_calculator.prototype.CLdivide = function(numerator,denominator){
    if (denominator==0)
        return 0;
    else
        return Math.round(numerator/denominator);
}
