function shuffle(array_var) {
  var current_index = array_var.length;
  var temporary_value,random_index;

  // While there remain elements to shuffle...
  while (current_index!=0) {

    // Pick a remaining element...
    random_index = Math.floor(Math.seededRandom()*current_index);
    current_index -= 1;

    // And swap it with the current element.
    temporary_value = array_var[current_index];
    array_var[current_index] = array_var[random_index];
    array_var[random_index] = temporary_value;
  }

  return array_var;
}
