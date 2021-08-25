// keeps value within parameters original name: K()
function clamp(value,minimum,maximum){
    if (value < minimum)
         return minimum;
    else if (value > maximum)
         return maximum;
    else return value;
}
