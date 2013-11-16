$(document).ready(function() {
	clearBoard();
	
	$("td").click(function() {
	  	var cell = $(this);
	  	var coords = getCoords(cell);
		
		if (!cell.hasClass("selected") && 
		    (selected_letters.length == 0 || adjacentLastSelected(coords))){
  		  	cell.addClass("selected");
			word += cell.find('div').html();
		  	selected_letters.push(getCoords(cell));
		} else if (coords.row == last_selected.row && coords.cell == last_selected.cell) {
		  cell.removeClass("selected");
		  trim = (word.substr(word.length-2, word.length) == 'Qu' ? 2 : 1);
		  word = word.substr(0, word.length-trim);
		  selected_letters.splice((selected_letters.length-1), 1);  	
		}
		last_selected = (selected_letters.length > 0) ? selected_letters[selected_letters.length-1] : [];
		$(".word").html(word);
	});

	$("#send").click(function() {
		var score = scoreWord(word);
		if (score != 0 ) {
		  if (score == -1) {
			  word = "<span class='notaword'>" + word + "</span>"
		  }
		  $(".score").html(Number($(".score").html()) + score);
		  $(".words").html($(".words").html() + word + "<br/>");
		  $(".selected").removeClass("selected");
		  clearBoard();
	  }
	});
	$("#suffle").click(function() {
		location.reload();
	});
});

function adjacentLastSelected(coords) {
    return (last_selected.row <= coords.row + 1 && 
		    last_selected.row >= coords.row - 1 && 
			last_selected.cell <= coords.cell + 1 && 
			last_selected.cell >= coords.cell - 1);
}

function findIndex(item) {
	return item.parent().children().index(item);
}

function getCoords(item) {
	return {row: findIndex(item.parent()), cell: findIndex(item)};
}

function scoreWord(word) {
	var score = 0;
	if (word.length > 2) {
	  $.ajax({
	    url: "http://localhost:3000/score",
	    async: false,
	    data: { word: word }
	  })
	    .done(function( data ) {
	  	  score = data;
	    });
	}
	return Number(score);
}

function clearBoard() {
  last_click = null;
  word = "";
  selected_letters = [];
  last_selected = [];
  $(".word").html(word);
}