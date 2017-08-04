// 카드의 전체 이미지 파일이다.
var sprite_sheet_image;

// 각 버튼을 다루기 위한 변수이다.
var hitButton, standButton, betButton, betInput;

var first = true;
var bettingViewFlag=true, playViewFlag=false;

var game;

// 카드를 배치시키기 위한 좌표이다.
var DealerCardPositionXY = [
  [72, 62],
  [162, 62],
  [252, 62],
  [342, 62],
  [432, 62]
];
var PlayerCardPositionXY = [
  [72, 262],
  [162, 262],
  [252, 262],
  [342, 262],
  [432, 262]
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
function Card(suit, value) {
  this.suit = -1;
  this.value = -1;

  // Card의 생성자의 인자가 2개 이상 들어오면 suit와 value를 저장 한다.
  if (arguments.length >= 2) {
    this.setCardInfo(arguments[0], arguments[1]);
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
  if (this.suit === -1) return "this card is not defined";
  var str = "suit : ";
  if (this.suit === 11) str + "Jack";
  else if (this.suit === 12) str + "Queen";
  else if (this.suit === 13) str + "King";
  else if (this.suit === 1) str + "Ace";
  return str + " value : " + this.value;
}

/**
 * @param suit은 카드의 모양을 나타내며, 1~4까지 들어올 수 있다.
 * @param value은 카드의 숫자를 나타내며, 1~13까지 들어올 수 있다.
 */
Card.prototype.setCardInfo = function(suit, value) {
  if (arguments.length < 2) throw "need more argument";

  var s = Math.round(Number(suit));
  var v = Math.round(Number(value));

  if (s < 1 || s > 4) throw "suit : invalid range";
  if (v < 1 || v > 13) throw "value : invalid range";

  this.suit = s;
  this.value = v;
}

/**
 * deck 객체는 52개의 카드들을 가지고 있으며, 다음 카드를 뽑거나, 덱을 섞는 메소드를 가지고 있다.
 */

function Deck() {
  this.deck = new Array(52);
  this.count = 52;
  var c = 0;
  //i는 카드 모양, j는 카드의 값을 의미한다. 52개의 카드를 덱에 세팅한다.
  for (var i = 1; i <= 4; i++) {
    for (var j = 1; j <= 13; j++) {
      this.deck[c++] = new Card(i, j);
    }
  }
}
// 섞는 방법을 더 어렵게 해 볼수도 있겠다.
Deck.prototype.shuffle = function() {
  for (var i = 51; i > 0; i--) {
    var randomVal = Math.floor((i + 1) * Math.random(i));
    var temp = this.deck[i];
    this.deck[i] = this.deck[randomVal];
    this.deck[randomVal] = temp;
  }

  this.count = 52;
}

Deck.prototype.nextCard = function() {
  if (this.count === 0) throw "this deck is out of card";
  return this.deck[--this.count];
}

function BlackjackGame() {
  this.processing = false;
  this.isGameover = false;
  this.gameMessage = "Welcome to Blackjack!";

  // 맨 처음엔 각각 function을 이용한 객체로 만들었다. 그런데 읽기 불편했다. 그래서 객체 리터럴로 만들어버렸다. 다른데에서 쓸 것도 아니어서 이렇게 했다.
  this.player = {
    cards : [],
    money : 100,
    betMoney : 0,
    total : 0,
    addCard : function(ele){
      if(this.cards.length < 5){
        this.total += ele.value;
        this.cards.push(ele);
      }
      //else 예외처리
    }
  };

  this.dealer = {
    cards : [],
    deck : new Deck(),
    addCard : function(ele){
      if(this.cards.length < 5) {
        this.total += ele.value;
        this.cards.push(ele);
      }
      //else 예외처리
    }
  };
}

BlackjackGame.prototype.setting = function(){
  this.dealer.deck = new Deck();
  this.dealer.deck.shuffle();

  this.player.cards = [];
  this.player.total = 0;
  this.dealer.cards = [];
  this.dealer.total = 0;
}

function OnBettingButtonClicked(){
  if(game.processing) return;
  game.processing = true;
  // 베팅 금액이 현재 있는 금액보다 크다면 현재 있는 금액으로 숫자를 바꿔줘야 함.
  game.dealer.deck.shuffle();
  game.player.addCard(game.dealer.deck.nextCard());
  game.player.addCard(game.dealer.deck.nextCard());
  game.dealer.addCard(game.dealer.deck.nextCard());
  game.dealer.addCard(game.dealer.deck.nextCard());

  bettingViewFlag = false;
  playViewFlag = true;

  game.processing = false;
  first = true;
}

function OnHitButtonClicked(){
  if(game.processing) return;
  game.processing = true;
  try{
    game.player.addCard(game.dealer.deck.nextCard());
  }catch(e){
    game.gameMessage = e.message;
  }

  if(game.player.total > 21){
    game.gameMessage = "You Loose : over 21";
    game.setting();
    bettingViewFlag = true;
    playViewFlag = false;
    first = true;
    setTimeout(function(){},500);
  }
  game.processing = false;
}

function OnStandButtonClicked(){
  if(game.processing) return;
  game.processing = true;
  while(game.dealer.total <= 16){ // 블랙잭 규칙이 16이하일 때만 딜러가 카드를 뽑음.
    try{
      game.dealer.addCard(game.dealer.deck.nextCard());
    }catch(e){
      game.gameMessage = e.message;
      break;
    }
  }
  if(game.player.total > game.dealer.total) {
    game.gameMessage = "You Win!";
    game.player.money += game.player.betMoney;
  }else if(game.player.total < game.dealer.total) {
    game.gameMessage = "You Loose!";
    game.player.money -= game.player.betMoney;
  }else if(game.player.total === game.dealer.total) {
    game.gameMessage = "Draw!";
  }

  game.setting();

  bettingViewFlag = true;
  playViewFlag = false;

  first = true;
  setTimeout(function(){},500);
  game.processing = false;
}

function OnNewGameButtonClicked(){
  game = new BlackjackGame();
}


// for draw
function preload() {
  sprite_sheet_image = loadImage('image/cards.png');
}

function setup() {
  game = new BlackjackGame();
  noStroke();
  //noLoop();
  createCanvas(588, 609);

}

function draw() {
  clear();
  draw_blackjackGame();
  // 게임이 진행됨에 따라 아래의 view 중 하나가 그려 질 것 이다.
  if(bettingViewFlag) draw_bettingView();
  if(playViewFlag) draw_PlayView();
  // 이미지는 이미 받아 왔고, 아래 코드로 포지션에 맞춰서 출력만 잘 해주면 된다.
  //image(sprite_sheet_image, DealerCardPositionXY[4][0], DealerCardPositionXY[4][1], 79, 123, 79 ,123 ,79 ,123);
}

function draw_blackjackGame() {
  draw_GameBoard();
  draw_money();
  draw_GameMessage(game.gameMessage);
}



// 나중엔 Sx, Sy를 받아서 그려 줄 것 이다.
function draw_GameBoard() {
  fill(color('#666600'));
  rect(30, 0, 530, 530);

  fill(color('#228800'));
  rect(40, 10, 510, 510);

  push();
  translate(40, 10);
  textSize(20);
  fill(color('#99FF99'));
  text("Dealer's Cards", 30, 25);
  for (var i = 1; i <= 5; i++) {
    fill(color('#666600'));
    rect(30 + 90 * (i - 1), 40, 83, 127);
  }

  textSize(20);
  fill(color('#99FF99'));
  text("Player's Cards", 30, 335);

  for (var i = 1; i <= 5; i++) {
    fill(color('#666600'));
    rect(30 + 50 * (i - 1) + 40 * (i - 1), 350, 83, 127);
  }
  pop();
}

function draw_bettingView() {
  if (first) {
    if(hitButton != undefined) hitButton.remove();
    if(standButton != undefined) standButton.remove();
    game.gameMessage = "Insert the betting money";
    draw_input();
    draw_betButton();
    first = false;
  }
}

function draw_PlayView() {
  if (first) {
    if(betButton != undefined) betButton.remove();
    if(betInput != undefined){
      game.player.betMoney = betInput.value();
      betInput.remove();
    }
    game.gameMessage = "Hit or Stand?";
    draw_Buttons();
    first = false;
  }
  draw_betMoney(game.player.betMoney);
}

function draw_money() {
  // 나중에는 금액을 인자로 받아서 처리
  push();
  translate(40, 10);

  textSize(20);
  fill(color('#99FF99'));
  text('Your Money', 30, 220);

  textSize(40);
  fill(color('#FFFF00'));
  text('$100', 50, 270);

  pop();
}

function draw_betMoney(money) {
  // 나중에는 금액을 인자로 받아서 처리
  push();
  translate(40, 10);
  textSize(20);
  fill(color('#99FF99'));
  text('Your bet', 370, 220);

  textSize(40);
  fill(color('#FFFF00'));
  text('$'+money, 390, 270);
  pop();

}

function draw_GameMessage(str) {
  push();
  translate(40, 10);
  textSize(40);
  textAlign(CENTER);
  text(str, 250, 570);
  pop();
}

function draw_input() {
  push();
  translate(40, 10);
  betInput = createInput();
  betInput.width = 60;
  betInput.position(300, 260);
  pop();
}

function draw_betButton() {
  push();
  translate(40, 10);
  betButton = createButton('Betting!');
  betButton.position(450, 260);
  // bet 금액을 받아와서 저장하고, first를 true 로 만들고, 게임 loop을 진행 시킨다.
  betButton.mousePressed(OnBettingButtonClicked);
  pop();
}

function draw_Buttons() {
  push();
  translate(40, 10);
  hitButton = createButton('hit');
  hitButton.position(265, 270);
  hitButton.mousePressed(OnHitButtonClicked);

  standButton = createButton('stand');
  standButton.position(305, 270);
  standButton.mousePressed(OnStandButtonClicked);
  pop();
}
