let cards = null;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let timeStart;
let scores = [];

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  $(this).addClass('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
	$(firstCard).off();
  $(secondCard).off();

  resetBoard();
	
	if (Array.from(cards).filter(f => f.classList.contains('flip')).length == cards.length) {
		setTimeout(() => {
			setScore();
			alert("Jogo terminado. Gerando novo jogo...");
			beginGame();
		}, 300);
	}
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    $(firstCard).removeClass('flip');
    $(secondCard).removeClass('flip');

    resetBoard();
  }, 1500);
}

function shuffle() {
  cards.each(function() {
    let randomPos = Math.floor(Math.random() * 12);
    $(this).css('order', randomPos);
  });
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function beginGame() {
	timeStart = new Date();
	
	cards.each(function() { $(this).on('click', flipCard) });
	
	shuffle();
  lockBoard = true;

  setTimeout(() => {
    cards.each(function() { $(this).removeClass('flip') });
    resetBoard();
  }, 3000);
}

function setScore() {
	let count = 1;
	let timeOfGame = Math.floor((new Date() - timeStart) / 1000);
	scores.push(timeOfGame);
	scores.sort();

	$('#ranking').html('');
	$('<p>', { class: 'title', html: 'Ranking'}).appendTo('#ranking');
	
	scores.forEach(score => {
		$('<p>', { class: 'item', html: count + 'º - ' + score + ' segundos'}).appendTo('#ranking');
		count++;
	});

	console.log('Tempo de jogo: ' + timeOfGame + ' segundos');
}

(function (){
	var imagens = ['img/facebook.png','img/android.png','img/chrome.png','img/firefox.png','img/html5.png','img/googleplus.png','img/twitter.png','img/windows.png'];

	let count = 0;
	imagens.forEach(img => {
	  $('<div>', { id: 'memory-card-' + count, class: 'memory-card flip', 'data-framework': img.substring(4, img.indexOf('.'))}).appendTo('#cards');
		
		$('<img>', { class: 'front-face', 'src': img}).appendTo('#memory-card-' + count + '');
		$('<img>', { class: 'back-face', 'src': 'img/cross.png'}).appendTo('#memory-card-' + count + '');
		
		count++;
		
		$('<div>', { id: 'memory-card-' + count, class: 'memory-card flip', 'data-framework': img.substring(4, img.indexOf('.'))}).appendTo('#cards');
		
		$('<img>', { class: 'front-face', 'src': img}).appendTo('#memory-card-' + count + '');
		$('<img>', { class: 'back-face', 'src': 'img/cross.png'}).appendTo('#memory-card-' + count + '');
		
		count++;
  });
	
	cards = $(document).find('.memory-card')

})();