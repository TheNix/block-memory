(function() {

  // A few counters
  var
    currentCount = 1,
    totalCount = 9,
    blockCount,
    hearts = 3,
    bestProgress = 0;

  var onBlockClick = function () {
    blockCount = this.dataset.counter;

    // Does the clicked block match what we're looking for?
    if (blockCount == currentCount) {
      this.classList.add('is-clicked');

      // Is this the furthest we've come yet?
      if(currentCount >= bestProgress) {
        bestProgress = currentCount;
      }

      // Have we won the game yet?
      if (blockCount == totalCount) {
        gameFinished();
      } else {
        currentCount++;
      }

    } else {
      // Failing to reveal new progress is "free"
      // Unless we've previously been here but messed up the path
      if (bestProgress - (currentCount - 1) > 0 ) {
        var $hearts = document.querySelector('.hearts__item.is-visible');

        $hearts.classList.remove('is-visible');

        hearts--;

        // Do we still have hearts left?
        if (hearts < 1) {
          gameOver();
        }
      }

      // Either way, reset the blocks and start over
      resetBlocks();
    }
  };

  // Resets all blocks as well as the current progress counter
  var resetBlocks = function () {
    for(i=0; i<$blocks.length; i++) {
      $blocks[i].classList.remove('is-clicked');
    }
    currentCount = 1;
  };


  // Show game over modal and reset hearts
  var gameOver = function () {
    $modalFail.style.webkitAnimationName = "flash";
    $modalFail.style.animationName = "flash";
    resetGame();
  };

  // Show game finished modal and reset hearts
  var gameFinished = function () {
    $modalSuccess.style.webkitAnimationName = "flash";
    $modalSuccess.style.animationName = "flash";
    resetBlocks();
    resetGame();
  };

  // Reset hearts and counters
  var resetGame = function () {
    $hearts = document.querySelectorAll('.hearts__item');

    for(i=0; i<$hearts.length; i++) {
      $hearts[i].classList.add('is-visible');
    }

    bestProgress = 0;
    hearts = 3;
  };


  // Reference blocks in array
  var $blocks = document.querySelectorAll('.block__item');
  var $modalSuccess = document.querySelector('.modal--success');
  var $modalFail = document.querySelector('.modal--fail');

  // Add event listeners to all blocks
  for(i=0; i<$blocks.length; i++) {
    $blocks[i].addEventListener('click', onBlockClick);
  }


  $modalSuccess.addEventListener('webkitAnimationEnd', function(){
    this.style.webkitAnimationName = '';
  }, false);

  $modalFail.addEventListener('webkitAnimationEnd', function(){
    this.style.webkitAnimationName = '';
  }, false);

  $modalSuccess.addEventListener('animationend', function(){
    this.style.animationName = '';
  }, false);

  $modalFail.addEventListener('animationend', function(){
    this.style.animationName = '';
  }, false);

})();
