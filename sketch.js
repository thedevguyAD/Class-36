var database ;
var foodS=20,foodStock;
var dog,dog1,dog2
var position;
var feed,add,last; 
var foodObject;
var fedTime;
var lastFed;
var name = "Dog"
function preload()
{
  dogimg1 = loadImage("dogImg.png")
  dogimg2 = loadImage("dogImg1.png")
  MilkImage=loadImage('Milk.png');

}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
  foodObject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2

  foodStock = database.ref('Food')
  foodStock.on("value",readStock);

  lastFed = database.ref('fedTime')
  lastFed.on("value",readTime)

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED "+name)
  feed.position(700,115)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(600,115)
  add.mousePressed(AddFood)
 
   
}
function readTime(time){
  fedTime = time.val()
}
function readStock(data){
 foodS = data.val();

}

function writeStocks(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

var pastTime,delay = 15,state = "idle";
function draw() {  

  background(46,139,87);

  foodObject.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill("white");
  textSize(20);
  if(lastFed>=12){
     text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
    }
  else{
    text("Last Feed : "+ lastFed + " AM", 350,30); 
  }  

  
  drawSprites();
   
  fill(255,255,254);
  textSize(15);
  //console.log(fedTime)
  text("Last Feed: "+pastTime, 600, 115)
 drawSprites();
//  setToHour();
 if(pt<frameCount-delay){
  dog.addImage(dogimg1) 
 }
 if(pt>frameCount-delay){
  image(MilkImage,500+(frameCount-pt),220,100,80);
 }
}


function readPosition(data){
  position = data.val();
  foodObject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}
function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
var pt;
function FeedDog(){

  if(foodS>0){
    pt = frameCount;

    dog.addImage(dogimg2) 
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
   database.ref('/').update({
     Food:foodObject.getFoodStock(),
     fedTime:hour()
   })
  }
  }
  function AddFood(){
    position++
    database.ref('/').update({
      Food:position})
    }
    

    
