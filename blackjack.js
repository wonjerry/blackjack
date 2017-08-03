
// 카드의 전체 이미지 파일이다.
var sprite_sheet_image;

// 각 버튼을 다루기 위한 변수이다.
var hitButton , standButton, newGameButton;

// 카드를 배치시키기 위한 좌표이다.
var DealerCardPositionXY = [
  [72,62],
  [162,62],
  [252,62],
  [342,62],
  [432,62]
];
var PlayerCardPositionXY = [
  [72,262],
  [162,262],
  [252,262],
  [342,262],
  [432,262]
];

/*
 * 숫자가 아닌 모양을 정의 해 둔다. ACE는 특정 조건에 따라 10이 될 수 있다.
 */
Card.ACE = 1;
Card.JACK = 11;
Card.QUEEN = 12;
Card.KING = 13;

/*
 * 모양을 일단 숫자로 정의 해 놓았다.
 */
Card.CLUB = 1;
Card.DIAMOND = 2;
Card.SPADE = 4;
Card.HEART = 3;

/**
* @param suit은 카드의 모양을 나타내며, 1~4까지 들어올 수 있다.
* @param value은 카드의 숫자를 나타내며, 1~13까지 들어올 수 있다.
*/
function Card(suit,value){
  this.suit = -1;
  this.value = -1;

  // Card의 생성자의 인자가 2개 이상 들어오면 suit와 value를 저장 한다.
  if(arguments.length >=2){
      this.setCardInfo(arguments[0],arguments[1]);
  }
}

/**
 *
 *  카드 객체를 다른 카드 정보를 가진 객체로 만들거나 할 때 사용된다.
 */
Card.prototype.clear = function() {
   this.suit = -1;
   this.value = -1;
}


/**
*
* 현재 카드 객체가 어떤 값을 가지고 있는지 출력 한다.
*/

Card.prototype.toString = function() {
  if(this.suit === -1) return "this card is not defined";
  var str = "suit : ";
  if(this.suit === 11) str + "Jack";
  else if(this.suit === 12) str + "Queen";
  else if(this.suit === 13) str + "King";
  else if(this.suit === 1) str + "Ace";
  return str + " value : " + this.value;
}

/**
* @param suit은 카드의 모양을 나타내며, 1~4까지 들어올 수 있다.
* @param value은 카드의 숫자를 나타내며, 1~13까지 들어올 수 있다.
*/
Card.prototype.setCardInfo = function(suit, value){
  if(arguments.length < 2) throw "need more argument";

  var s = Math.round(Number(suit));
  var v = Math.round(Number(value));

  if( s < 1 || s > 4) throw "suit : invalid range";
  if( v < 1 || v > 13) throw "value : invalid range";

  this.suit = s;
  this.value = v;
}

/**
* deck 객체는 52개의 카드들을 가지고 있으며, 다음 카드를 뽑거나, 덱을 섞는 메소드를 가지고 있다.
*/

function Deck(){
  this.deck = new Array(52);
  this.count = 52;
  var c = 0;
  //i는 카드 모양, j는 카드의 값을 의미한다. 52개의 카드를 덱에 세팅한다.
  for(var i = 1; i<=4; i++){
    for(var j = 1; i<=13; i++){
      this.deck[c++] = new Card(i,j);
    }
  }
}
// 섞는 방법을 더 어렵게 해 볼수도 있겠다.
Deck.prototype.shuffle = function(){
  for( var i = 51; i>0; i--){
    var randomVal = Math.floor((i+1)*Math.random(i));
    var temp = this.deck[i];
    this.deck[i] = this.deck[randomVal];
    this.deck[randomVal] = temp;
  }

  this.count = 52;
}

Deck.prototype.nextCard = function(){
  if(this.count === 0) throw "this deck is out of card";
  return this.deck[--this.count];
}

function BlackjackGame(){
  //this.progress = false;
  this.money = 100;
  this.bet = 0;
  this.isGameover = false;
  this.deck = new Deck();
  this.gameMessage = "Welcome to Blackjack!"
  this.dealerCard = [];
  this.dealerCardCnt = 0;
  this.playerCard = [];
  this.playerCardCnt = 0;
}

BlackjackGame.prototype.CardToDealer(){
  if(this.dealerCardCnt > 5) return false;
  this.dealerCard.push(this.deck.nextCard());
  this.dealerCardCnt++;
  return true;
}

BlackjackGame.prototype.CardToPlayer(){
  if(this.playerCardCnt > 5) return false;
  this.playerCard.push(this.deck.nextCard());
  this.playerCardCnt++;
  return true;
}

function blackjackGame_run(){
  game = new blackjackGame();
  
}


// for draw
function preload() {
  sprite_sheet_image = loadImage('image/cards.png');
}

function setup() {
  textSize(20);
  noStroke();
  noloop();
  createCanvas(588, 609);
  draw_input();
  draw_Buttons();
}

function draw() {
  clear();
  draw_blackjackGame();
  // 이미지는 이미 받아 왔고, 아래 코드로 포지션에 맞춰서 출력만 잘 해주면 된다.
  //image(sprite_sheet_image, DealerCardPositionXY[4][0], DealerCardPositionXY[4][1], 79, 123, 79 ,123 ,79 ,123);
}

function draw_blackjackGame(){
  draw_GameBoard();
  draw_money();
  draw_bet();
  draw_GameMessage(game.gameMessage);
}



// 나중엔 Sx, Sy를 받아서 그려 줄 것 이다.
function draw_GameBoard(){
  fill(color('#666600'));
  rect(30, 0, 530, 530);

  fill(color('#228800'));
  rect(40, 10, 510, 510);

  push();
  translate(40, 10);
  textSize(20);
  fill(color('#99FF99'));
  text("Dealer's Cards",30,25);
  for(var i = 1; i<=5; i++){
    fill(color('#666600'));
    rect(30 + 90 * (i-1), 50, 83, 127);
  }

  textSize(20);
  fill(color('#99FF99'));
  text("Player's Cards",30,225);

  for(var i = 1; i<=5; i++){
    fill(color('#666600'));
    rect(30 + 50 * (i-1) + 40 * (i-1), 250, 83, 127);
  }


  pop();
}

function draw_money(){
  // 나중에는 금액을 인자로 받아서 처리
  push();
  translate(40, 10);

  textSize(20);
  fill(color('#99FF99'));
  text('Your Money',30,410);

  textSize(40);
  fill(color('#FFFF00'));
  text('$100',50,470);

  pop();
}

function draw_bet(){
  // 나중에는 금액을 인자로 받아서 처리
  push();
  translate(40, 10);
  textSize(20);
  fill(color('#99FF99'));
  text('Your bet',300,410);
  pop();

}

function draw_GameMessage(str){
  push();
  translate(40, 10);
  textSize(40);
  text(str,250,570);
  pop();
}

function draw_input(){
  push();
  translate(40, 10);
  input = createInput();
  input.width = 60;
  input.position(370, 460);
  pop();
}
// 뭔가 버튼들을 묶어서 관리하고 싶다.
// canvas를 여러개 만들어서 관리할 수 있는건가?
function draw_Buttons(){
  push();
  translate(40, 10);
  hitButton = createButton('hit');
  hitButton.position(200, 550);
  //button.mousePressed(greet);

  standButton = createButton('stand');
  standButton.position(240, 550);
  //button.mousePressed(greet);

  newGameButton = createButton('newGame');
  newGameButton.position(300, 550);
  //button.mousePressed(greet);
  pop();
}
