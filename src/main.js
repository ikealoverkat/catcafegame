import kaplay from "kaplay";
import "kaplay/global"; 

kaplay();

loadRoot("./"); 
loadSprite("icecream_vanilla", "sprites/icecream_vanilla.png");

add([pos(120, 80), sprite("icecream_vanilla")]);

onClick(() => addKaboom(mousePos()));