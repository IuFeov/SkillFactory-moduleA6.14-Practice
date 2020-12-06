const numDivs = 36;
const maxHits = 10;

let hits = 0;
let wrongHits = 0;
let firstHitTime = 0;
//----------------------
//----------------------
//START GAME
function startGame()  {
  hits = 0;
  wrongHits = 0;
  firstHitTime = 0;
  $('.game-field').text("");
  $('.game-field').removeClass("miss");
  $("#win-message").addClass("d-none");
  $(".game-field").removeClass("d-none");
  round();
}

//END GAME
function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".game-field").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-wrong-targets").text(wrongHits);
  $("#win-message").removeClass("d-none");
}

//ROUND
function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $('.game-field').removeClass("target");
  let divSelector = randomDivId();
  console.log(divSelector);
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  $(divSelector).text(hits+1);
  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 1) {
  firstHitTime = getTimestamp();
  //console.log(firstHitTime);
}
  if (hits === maxHits) {
    endGame();
  }
}

function handleClick(event) {
    // FIXME: убирать текст со старых таргетов. Кажется есть .text?
    $('.game-field').text("");
    $('.game-field').removeClass("miss");
    if ($(event.target).hasClass("target")) {
      hits = hits + 1;
      round();
    }
    // TODO: как-то отмечать если мы промахнулись? 
    else  {
      if (!$(event.target).hasClass("miss")) {
        let wrongRedTarget = $(this).prop('id');
        $(`#${wrongRedTarget}`).addClass("miss");
        $(`#${wrongRedTarget}`).text("Ops!");
        wrongHits = wrongHits + 1;
        round();
      }
    };
  }

function init() {
  $("#start").click(startGame);
  $(".game-field").click(handleClick);
}

$(document).ready(init)