//set variables
var healthPoints = 0;
var attackPower = 0;
var counterAttackPower = 0;

var owk = {
	hp: "120",
	baseAttackPower: "8"
}

var ls = {
	hp: "100",
	baseAttackPower: "5"

}

var ds = {
	hp: "150"
	baseAttackPower: "20"

}

var dm = {
	hp: "180",
	baseAttackPower: "25"

}

//write each character's hp into their hp div
$("#owk-hp").text(owk.hp);
$("#ls-hp").text(ls.hp);
$("#ds-hp").text(ds.hp);
$("#dm-hp").text(dm.hp);

// //function that lets player choose a defender to attack
// var defender = $("#owk").on("click", function(){
// 	$("#defender:empty").append($("#owk"));
// });

// var defender = $("#ls").on("click", function(){
// 	$("#defender:empty").append($("#ls"));
// });

// var defender = $("#ds").on("click", function(){
// 	$("#defender:empty").append($("#ds"));
// });

// var defender = $("#dm").on("click", function(){
// 	$("#defender:empty").append($("#dm"));
// });

//function that enables player to choose their character
//fight section which pick up whatever characters left after user choose their character
var yourCharacter = $("#owk").on("click", function(){
	$("#yourCharacter:empty").append($("#owk"));
	$("#fightSection").append($("#ls"));
	$("#fightSection").append($("#ds"));
	$("#fightSection").append($("#dm"));

	var defender = $("#ls").on("click", function(){
		$("#defender:empty").append($("#ls"));
	});

	var defender = $("#ds").on("click", function(){
		$("#defender:empty").append($("#ds"));
	});

	var defender = $("#dm").on("click", function(){
		$("#defender:empty").append($("#dm"));
	});	

});

var yourCharacter = $("#ls").on("click", function(){
	$("#yourCharacter:empty").append($("#ls"));
	$("#fightSection").append($("#owk"));
	$("#fightSection").append($("#ds"));
	$("#fightSection").append($("#dm"));
});

var yourCharacter = $("#ds").on("click", function(){
	$("#yourCharacter:empty").append($("#ds"));
	$("#fightSection").append($("#ls"));
	$("#fightSection").append($("#owk"));
	$("#fightSection").append($("#dm"));
});

var yourCharacter = $("#dm").on("click", function(){
	$("#yourCharacter:empty").append($("#dm"));
	$("#fightSection").append($("#ls"));
	$("#fightSection").append($("#ds"));
	$("#fightSection").append($("#owk"));
});


//attack function
$("#attack").on("click", function(){

	//whoever in the defender section gonna lose 8 hp
	//userCharacter gonna be attacked by certain amount of hp (counter attack power)
	//click attack button again and again and again
	//now the enemy gonna lose 8*2, 8*3, 8*4 hp...
	//userCharacter gonna be attacked by the same certain amount of hp (counter attack power)
	
	//for loop?

	//when the enemy is defeated, take the enemy picture from defender div

	//when there's no enemy in the defender section, write "No enemy here."

	//choose another enemy to fight

	//userCharacter attack power gonna continue to grow based on last round attack
	//enemy attack power (counter attack power) stay the same

	   

});


//once all the other characters have been defeated, then game stop, user win
//else if userCharacter hp <= 0, then user lose, game over
//create restart button to restart the game
