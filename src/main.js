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

loadSprite("confetti", "sprites/confetti.png");


scene ("game", () => {
    var randomFoodNumber = 0;
    var randomFood = "";
    var randomFoodMissing = "";
    var missingItem = "";
    var missingItemX = 200;
    var missingItemY = 600;
    var missingItemScale = 1;       
    var foodContainer = "";
    var numberOfFoodItems = 0;


    function newFoodItem () {
        numberOfFoodItems++;
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
            missingItemY = 625 - (numberOfFoodItems * 100);
            missingItemScale = 0.45;
            foodContainer = "cup";
        } 
        else {
        randomFoodMissing = "donut_missing";
            missingItemX = 175;
            missingItemY = 650 - (numberOfFoodItems * 100); 
            missingItemScale = 0.6;   
            foodContainer = "plate";
        }

        // destroyAll("foodItem");
        destroyAll("missingItem");

        missingItem = add([
            pos(missingItemX, missingItemY),
            sprite(randomFoodMissing),
            scale(missingItemScale),
            "missingItem",
        ])
        
        foodItem = add([
            pos(0, missingItemY),
            sprite(randomFood),
            scale(missingItemScale + 0.03),
            area(),
            "foodItem",
        ])
    }

    function addFoodContainer () {
        if (randomFoodNumber <= 3) {
            add([
                sprite("cup"),
                pos(missingItemX - 10, missingItemY + 50),
                z(-10),
                scale(missingItemScale + 0.25),
            ])
        } //cup
        if (randomFoodNumber > 3) {
            add([
                sprite("plate"),
                pos(missingItemX - 60, missingItemY),
                z(-10),
                scale(missingItemScale + 0.1),
            ])
        } //plate
    }

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

    var foodItem = "";
    newFoodItem();
    addFoodContainer();

    var foodItemClickPosX = 0;

    onClick(() => {
        if (Math.abs(foodItem.pos.x - missingItem.pos.x) <= 30) {
            foodItemClickPosX = foodItem.pos.x;
            debug.log("yay");
            randomFoodNumber = randi(6);
            foodItemSpeed += 25;
            newFoodItem();
        } else {
                const winConfetti = add([
                    pos(foodItem.pos.x, foodItem.pos.y),
                    particles({
                        max: 50,
                        speed: [75, 100],
                        lifetime: [0.75,1.0],
                        angle: [0, 360],
                        opacities: [1.0, 0.5],
                        texture: getSprite("confetti"),
                        colors: [rgb(255, 0, 0), rgb(0, 255, 0), rgb(0, 0, 255)],
                    }),
                lifespan(1.1),
                ])
            debug.log("booo");
        }
    })
})


go("game");