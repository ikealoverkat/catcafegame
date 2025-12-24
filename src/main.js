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
    var randomFoodNumber = randi(6);
    
    var randomFood = "";
    var randomFoodMissing = "";

    if (randomFoodNumber == 0) {
        randomFood = "icecream_vanilla";
        randomFoodMissing = "icecream_missing";
    } else if (randomFoodNumber == 1) {
        randomFood = "icecream_strawberry";
        randomFoodMissing = "icecream_missing";
    } else if (randomFoodNumber == 2) {
        randomFood = "icecream_chocolate";
        randomFoodMissing = "icecream_missing";
    } else if (randomFoodNumber == 3) {
        randomFood = "icecream_caramel";
        randomFoodMissing = "icecream_missing";
    } else if (randomFoodNumber == 4) {
        randomFood = "donut_strawberry";
        randomFoodMissing = "donut_missing";
    } else if (randomFoodNumber == 5) {
        randomFood = "donut_chocolate";
        randomFoodMissing = "donut_missing";
    }

    // console.log(randomFoodNumber);
    // console.log(randomFood);
    // console.log(randomFoodMissing);

    var missingItemX = 200;
    var missingItemY = 600;
    var missingItemScale = 1;
    var foodContainer = "";

    if (randomFoodNumber == 4 || randomFoodNumber == 5) {
        missingItemX = 175;
        missingItemY = 650; 
        missingItemScale = 0.6;   
        foodContainer = "plate";
    } else {
        missingItemX = 135;
        missingItemY = 625;
        missingItemScale = 0.45;
        foodContainer = "cup";
    }

    var missingItem = add([
        pos(missingItemX, missingItemY),
        sprite(randomFoodMissing),
        scale(missingItemScale),
    ])
    
    // var foodContainerItem = add([
    //     pos(missingItemX - 10, missingItemY + 50),
    //     sprite(foodContainer),
    //     scale(missingItemScale + 0.1),
    // ]) //boi just code this later

    var foodItemDir = 1; //right

    onUpdate(() => {
        foodItem.move(foodItemDir*240, 0);
        
        if (foodItem.pos.x > 320) {
            foodItemDir = -1; //left
        } 
        if (foodItem.pos.x < 0) {
            foodItemDir = 1; //right
        }
    })

    // for (let i = 0; i < 380; i++) {
    //     foodItem.move(foodItemDir, 120);
    //     foodItemDir = RIGHT;
    // } 

    var foodItem = add([
        pos(0, missingItemY),
        sprite(randomFood),
        scale(missingItemScale + 0.03),
        area(),
        "foodItem",
    ])
})

go("game");