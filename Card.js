// card 객체를 다루는 파일이다. card 객체를 생성하며 card에 관련된 함수들을 정의하고 있다.

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
