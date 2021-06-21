//Create variables here
var database;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;
var feed;
var fedTime,lastFed,foodRem;
var foodObj;

var value;
var milkimg,milkbottle;
function preload()
{
  dogimage = loadImage("Dog.png");
  dogimage2 = loadImage("happy dog.png");
}

function setup() {
    database = firebase.database();
  createCanvas(1000,500);
  foodObj=new Food(); 
  food = database.ref('Food');
  food.on("value",readStock);

  //foodObj.updateFoodStock(20);

  dog = createSprite(250,300);
  dog.addImage(dogimage);
  dog.scale = 0.2;

  feed = createButton("Feed your dog");
  feed.position(650,100);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(450,100);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46, 139, 87);
  
  
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed + " PM", 150,25);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Fed : "+ lastFed + " AM", 150,25);
   }
   drawSprites();
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog()
{
  dog.addImage(dogimage2);

  var food_Stock_Val = foodObj.getFoodStock();
  if(food_Stock_Val<=0)
  {
   foodObj.updateFoodStock(food_Stock_Val*0);
  }
  else{
    foodObj.updateFoodStock(food_Stock_Val-1);
    }

    database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
    });
  }

function addFoods()
{
  
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
}