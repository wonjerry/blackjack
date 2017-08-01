//Creating animations from sprite sheets
var sprite_sheet_image;
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

function preload() {
  sprite_sheet_image = loadImage('image/cards.png');
}

function setup() {
  textSize(20);
  noStroke();
  createCanvas(588, 609);
  draw_input();
  draw_Buttons();
}

function draw() {
  clear();
  draw_blackjackGame();
  image(sprite_sheet_image, DealerCardPositionXY[4][0], DealerCardPositionXY[4][1], 79, 123, 79 ,123 ,79 ,123);
}

function draw_blackjackGame(){
  draw_GameBoard();
  draw_money();
  draw_bet();
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
  button1 = createButton('hit');
  button1.position(200, 550);
  //button.mousePressed(greet);

  button2 = createButton('stand');
  button2.position(240, 550);
  //button.mousePressed(greet);

  button3 = createButton('newGame');
  button3.position(300, 550);
  //button.mousePressed(greet);
  pop();
}
