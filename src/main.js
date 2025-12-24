import kaplay from "kaplay";
import "kaplay/global"; 

kaplay({
    width: 768,
    height: 1024,
});

debug.inspect = true;

loadRoot("./"); 
loadSprite("logo", "ui/logo.png")

loadSprite("icecream_vanilla", "sprites/icecream_vanilla.png");
loadSprite("icecream_strawberry", "sprites/icecream_strawberry.png");
loadSprite("icecream_chocolate", "sprites/icecream_chocolate.png");
loadSprite("icecream_caramel", "sprites/icecream_caramel.png");
loadSprite("icecream_missing", "sprites/icecream_missing.png");

loadSprite("donut_strawberry", "sprites/donut_strawberry.png");
loadSprite("donut_chocolate", "sprites/donut_chocolate.png");
loadSprite("donut_missing", "sprites/donut_missing.png");

loadSprite("plate", "sprites/plate.png");
loadSprite("cup", "sprites/cup.png");
loadSprite("takeoutbag", "sprites/takeoutbag.png");


scene ("game", () => {
    var randomFoodNumber = 0;
    var randomFood = "";
    var randomFoodMissing = "";
    var missingItem = "";
    var missingItemX = 200;
    var missingItemY = 600;
    var missingItemScale = 1;       
    var foodContainer = "";


    function newFoodItem () {
        randomFoodNumber = randi(6);    

        if (randomFoodNumber == 0) {randomFood = "icecream_vanilla";}
        if (randomFoodNumber == 1) {randomFood = "icecream_strawberry";}
        if (randomFoodNumber == 2) {randomFood = "icecream_chocolate";}
        if (randomFoodNumber == 3) {randomFood = "icecream_caramel";}
        if (randomFoodNumber == 4) {randomFood = "donut_strawberry";}
        if (randomFoodNumber == 5) {randomFood = "donut_chocolate";}

        if (randomFoodNumber <= 3) {
            randomFoodMissing = "icecream_missing";
            missingItemX = 135;
            missingItemY = 625;
            missingItemScale = 0.45;
            foodContainer = "cup";
        } 
        else {
        randomFoodMissing = "donut_missing";
            missingItemX = 175;
            missingItemY = 650; 
            missingItemScale = 0.6;   
            foodContainer = "plate";
        }

        destroyAll("foodItem");
        destroy(missingItem);

        missingItem = add([
            pos(missingItemX, missingItemY),
            sprite(randomFoodMissing),
            scale(missingItemScale),
        ])
        
        foodItem = add([
            pos(0, missingItemY),
            sprite(randomFood),
            scale(missingItemScale + 0.03),
            area(),
            "foodItem",
        ])
    }
    

    // if (randomFoodNumber == 4 || randomFoodNumber == 5) {
    //     missingItemX = 175;
    //     missingItemY = 650; 
    //     missingItemScale = 0.6;   
    //     foodContainer = "plate";
    // } else {
    //     missingItemX = 135;
    //     missingItemY = 625;
    //     missingItemScale = 0.45;
    //     foodContainer = "cup";
    // }


    
    // var foodContainerItem = add([
    //     pos(missingItemX - 10, missingItemY + 50),
    //     sprite(foodContainer),
    //     scale(missingItemScale + 0.1),
    // ]) //boi just code this later

    var foodItemDir = 1; //right
    var foodItemSpeed = 240;

    onUpdate(() => {
        foodItem.move(foodItemDir*foodItemSpeed, 0);
        
        if (foodItem.pos.x > 310) {
            foodItemDir = -1; //left
        } 
        if (foodItem.pos.x < -15) {
            foodItemDir = 1; //right
        }
    })

    // for (let i = 0; i < 380; i++) {
    //     foodItem.move(foodItemDir, 120);
    //     foodItemDir = RIGHT;
    // } 

    var foodItem = "";
    newFoodItem();

    onClick(() => {
        if (Math.abs(foodItem.pos.x - missingItem.pos.x) <= 30) {
            destroy(foodItem);
            debug.log("yay");
            randomFoodNumber = randi(6);
            foodItemSpeed += 25;
            newFoodItem();
        } else {
            debug.log("booo");
        }
    })
})


go("game");