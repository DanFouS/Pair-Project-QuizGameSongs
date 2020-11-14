var questions = [{record: "adele-rolling-in-the-deep-official-music-video.mp3" , answers: ["Rolling In The Deep", "Poker Face", "Blue Jeans"]},
{record: "alan-walker-faded.mp3", answers: ["Faded", "Wicked Games", "Paradise"]},
{record: "bob-dylan-knockin-on-heavens-door.mp3", answers: ["Knocking On Heaven's Door", "Take Me To Church", "Lost On You"]},
{record: "chris-isaak-wicked-game.mp3", answers: ["Wicked Game", "Feel", "Mad About You"]},
{record: "coldplay-fix-you.mp3", answers: ["Fix You", "The scientist", "Yellow"]},
{record: "coldplay-paradise.mp3", answers: ["Paradise", "Let Her Go", "Believer"]},
{record: "ed-sheeran-shape-of-you.mp3", answers: ["Shape Of You", "Perfect", "Thinking Outloud"]},
{record: "Frank Sinatra - I Love You Baby.mp3", answers: ["I Love You Baby", "Fly me To The Moon", "Killing Me softly"]},
{record: "hozier-take-me-to-church.mp3", answers: ["Take Me To Church", "Hurt", "All Of Me"]},
{record: "jennifer-lopez-on-the-floor-ft-pitbull.mp3", answers: ["On The Floor", "Dance Again", "Papi"]},
{record: "justin-bieber-yummy.mp3", answers: ["Yummy", "Swalla", "7 Rings"]},
{record: "kodaline-all-i-want.mp3", answers: ["All I want", "All I Ask", "Everything I Wanted"]},
{record: "lady-gaga-poker-face.mp3", answers: ["Poker Face", "Bad Romance", "Dark Horse"]},
{record: "lana-del-rey-blue-jeans.mp3", answers: ["Blue Jeans", "Summer Time Sadness", "Born To Die"]},
{record: "lp-lost-on-you.mp3", answers: ["Lost on You", "Suspicion", "Other People"]},
{record: "luis-fonsi-despacito-ft-daddy-yankee.mp3", answers: ["Despacito", "Senorita", "Roar"]},
{record: "maroon-5-girls-like-you-ft-cardi-b.mp3", answers: ["Girls Like You", "Let Me Love You", "Royals"]},
{record: "whitney-houston-i-will-always-love-you.mp3", answers: ["I will always love you", "My Heart Will go on", "I have Nothing"]}]
	var randomQuestion = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
var shuffle = function(array){
	var j, x;
	var arr = array;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}
function makeQuiz(questions){
	var counter = 1;
	var score = 0;
	var makeQuestion = function(){
		console.log(questions)
	var question = randomQuestion(questions)
	var correctAnswer = question.answers[0]
	var arrAnswers = shuffle(question.answers);
	questions = questions.filter(function(element){return element.record !== question.record})
	$('body').html('')
	$('body').append(`<div><span class='cntr'>` + counter + ` / 10 </span><span class ='scr'>` + score + `</span></div>`)
	$('body').append(`<div class="audioContainer"><button id="musicToggler">PLAY</button>
		</div><img id="headPhone" src="headphone.png">`)
	$('body').append(`<div><audio id="pop">
  <source src="cutted-songs/` + question.record +`" type="audio/mpeg">
  </audio></div>`)
	$('body').append(`<div class="answersContainer"></div>`)
	for (var i = 0; i < arrAnswers.length; i++){
		$('.answersContainer').append(`<div class= "option">` + arrAnswers[i] + `</div>`)
	}
	var playing = false
	var pop = $('#pop')[0]
	$('#musicToggler').on("click", function() {
	  if(playing === false) {
				pop.play();
				playing = true;
				this.innerHTML = "PAUSE";
			} else {
				pop.pause();
				playing = false;
				this.innerHTML = "PLAY" ;
			}
	})
	$(".option").on("click",{ firstAnswer: true }, function(event){
		var addScore = 0
			if ($(this).text() === correctAnswer){
				$(this).css('background', 'lightgreen');
				addScore= 100;
			} else {
				$(this).css('background', '#FF1493');
				addScore= -100
			}
			 if (event.data.firstAnswer){
			 	score +=addScore
			 	counter ++
			 	event.data.firstAnswer = false
			  	setTimeout(function(){$(".option").click()},500)
			 	if (counter > 10 ){
			 		setTimeout(function(){$('body').html('')
					$('body').append(`<div class="end" id="finish">Congratulations! You finished the Quiz</div>
						<div class="end" id="finalScore">Your score is` + ' ' + score + `<div class="imageHolder"></div><img id="note6" class="music" src="6.png">
						<img id="note1" class="music" src="1.png"><img id="note2" class="music" src="2.png"><img id="note3" class="music" src="3.png"></div>`)},1000)
				}else{
			  		setTimeout( makeQuestion,1000)
				}
			}
		})
}
	return makeQuestion
}
$(document).ready(function(){
	var questione = makeQuiz(questions)
	questione()
})