import kaplay from "kaplay";
import "kaplay/global"; 

kaplay({
    width: 768,
    height: 1024,
});

// debug.inspect = true;

loadRoot("./"); 
loadSprite("logo", "ui/logo.png")
loadSprite("heart", "ui/heart.png");

loadSprite("confetti", "effects/confetti.png");
loadSprite("red", "effects/red.png");

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
    layers(["bg", "obj", "ui"], "obj");

    var randomFoodNumber = 0;
    var randomFood = "";
    var randomFoodMissing = "";
    var missingItem = "";
    var missingItemX = 200;
    var missingItemY = 600;
    var missingItemScale = 1;       
    var foodContainer = "";
    var numberOfFoodItems = 0;
    var health = 5;
    var isGameOver = false;

    function updateHearts () {
        destroyAll("heart");
        for (let i = 0; i < health; i++) {
            add([
                sprite("heart"),
                pos(20 + (i * 40), 20),
                scale(0.05),
                layer("ui"),
                fixed(),
                "heart",
            ])
        }
    }

    updateHearts();
    
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
    onUpdate(() => {
        if (isGameOver == false) {
            const current = camPos();
            const newY = lerp(current.y, foodItem.pos.y + 50, 0.05);   
            camPos(current.x, newY);
        }
    })

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

    function updateScoreText ()  {
        destroyAll("scoreText");
        const score = add([
            text("Score: " + (numberOfFoodItems - 1), { size: 48 }),
            pos(500, 35),
            layer("ui"),
            fixed(),
            "scoreText",
        ])
    }
    
    var combo = 0;

    var randomTextPosX = rand(50, 300);
    var randomTextPosY = rand(200, 600);
    
    onUpdate(() => {
        randomTextPosX = rand(50, 300);
        randomTextPosY = rand(200, 600);
    })

    function addComboText () {
        combo++;
        
        if (combo == 3 || combo == 6 || combo == 9 || combo == 12) {
            health++;
            updateHearts();
            // debug.log("Health: " + health);
        }
        
        add ([
            text("COMBO x" + combo + " !!", {size: 48}),
            pos(randomTextPosX, randomTextPosY),
            opacity(1),
            z(10),
            layer("ui"),
            fixed(),
            lifespan(1, { fade: 0.5 }),
        ])
    }

    var foodItem = "";
    newFoodItem();
    addFoodContainer();

    var foodItemClickPosX = 0;

    // let winParticleEmitter = add([
    //     pos(center()),
    //     particles (
    //         {
    //             max: 20,
    //             speed: [50, 50],
    //             lifeTime: [0.2, 0.5],
    //         }, //particles options (particleOpt)
    //         {
    //             direction: 0,
    //             spread: 45,
    //         } //emiitter options (emitterOpt)
    //     )
    // ])

    onClick(() => {
        if (Math.abs(foodItem.pos.x - missingItem.pos.x) <= 30) {
            foodItemClickPosX = foodItem.pos.x;
            // debug.log("yay");
            randomFoodNumber = randi(6);
            foodItemSpeed += 25;
            newFoodItem();
            updateScoreText();
            addComboText();
            add([
                sprite("confetti"),
                layer("ui"),
                fixed(),
                pos(0,0),
                scale(1.5),
                opacity(0.5),
                lifespan(0, { fade: 0.5 }),
            ])
            foodItem.scale = vec2(missingItemScale - 0.01, missingItemScale - 0.01);
            wait(0.05, () => {
                foodItem.scale = vec2(missingItemScale + 0.01, missingItemScale + 0.01);
                wait(0.05, () => {
                    foodItem.scale = vec2(missingItemScale, missingItemScale);
                })
            })
        } else {
            combo = 0;
            health--;
            add([
                sprite("red"),
                layer("ui"),
                fixed(),
                pos(0, 0),
                opacity(0.5),
                lifespan(0, { fade: 0.5 }),
            ])
            shake(5);
            // debug.log("Health: " + health);
            // debug.log("booo");
            
            if (health <= 0) {
            isGameOver = true;
            onUpdate(() => {
                const current = camPos();
                const newY = lerp(current.y, 625, 0.02);   
                camPos(current.x, newY);
                wait(3.5, () => {
                    go("gameover");
                })
            })
            }
        updateHearts();
        }
    })

})

scene ("gameover", () => { 
    add([
        text("yo", {size: 64}),
        pos(center()),
    ])
});


go("game");