Math.seededRandom = function(maximum,minimum) {
    maximum = maximum || 1;
    minimum = minimum || 0;

    Math.seed = (Math.seed*9301+49297)%233280;
    var rnd = Math.seed/233280.0;

    return minimum+rnd*(maximum-minimum);
}
