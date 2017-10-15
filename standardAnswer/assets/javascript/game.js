//Execute this code when the DOM has fully loaded
$(document).ready(function(){

	//VARIABLE DECLARATION
	// ==============================================================

	//Creating an object to hold our characters
	var characters = {
		"Obi-Wan Kenobi": {
			name: "Obi-Wan Kenobi",
			health: 120,
			attack: 8,
			imageUrl: "assets/images/ObiWan_hood.jpg",
			enemyAttackBack: 15
		},
		"Luke Skywalker": {
			name: "Luke Skywalker",
			health: 100,
			attack: 14,
			imageUrl: "assets/images/luke.jpg",
			enemyAttackBack: 5
		},
		"Darth Sidious": {
			name: "Darth Sidious",
			health: 150,
			attack: 8,
			imageUrl: "assets/images/darth.jpg",
			enemyAttackBack: 5
		},
		"Darth Maul": {
			name: "Darth Maul",
			health: 180,
			attack: 7,
			imageUrl: "assets/images/darth_maul.jpg",
			enemyAttackBack: 25
		}
	};

	// var character = {
	// 	"Obi-Wan Kenobi": {
	// 		name: "Obi-Wan Kenobi",
	// 		health: 120,
	// 		attack: 8,
	// 		imageUrl: "assets/images/ObiWan_hood.jpg",
	// 		enemyAttackBack: 15
	// 	};

	// var character = {
	// 	"Luke Skywalker": {
	// 		name: "Luke Skywalker",
	// 		health: 100,
	// 		attack: 14,
	// 		imageUrl: "assets/images/luke.jpg",
	// 		enemyAttackBack: 5
	// 	};
		
	// var character = {
	// 	"Darth Sidious": {
	// 		name: "Darth Sidious",
	// 		health: 150,
	// 		attack: 8,
	// 		imageUrl: "assets/images/darth.jpg",
	// 		enemyAttackBack: 5
	// 	};

	// var character = {
	// 	"Darth Maul": {
	// 		name: "Darth Maul",
	// 		health: 180,
	// 		attack: 7,
	// 		imageUrl: "assets/images/darth_maul.jpg",
	// 		enemyAttackBack: 25
	// 	};	

	var currSelectedCharacter;
	var combatants = [];
	var currDefender;
	//will keep track of turns during combat.
	var turnCounter = 1;
	//tracks number of defeated opponents
	var killCount = 0;
	
	//FUNCTIONS
	// ==============================================================================

	//This function will render a character card to the page
	//The character rendered and the area they are rendered to
	var renderOne = function(character, renderArea, charStatus){
		var charDiv = $("<div class='character' data-name='" + character.name + "'>");
		var charName = $("<div class='character-name'>").text(character.name);
		var charImage = $("<img alt='image' class='charater-image'>").attr("src", character.imageUrl);
		var charHealth = $("<div class='character-health'>").text(character.health);

		charDiv.append(charName).append(charImage).append(charHealth);
		$(renderArea).append(charDiv);

		// $(renderArea).text("test");

		//if the character is an enemy or defender (the active opponent)
		if(charStatus === "enemy"){
			$(charDiv).addClass("enemy");
		}
		else if(charStatus === "defender"){
			//populate currDefender with the selected opponent's info
			currDefender = character;
			$(charDiv).addClass("target-enemy");
		}
					
	}

	//Function to handle rendering game messages
	var renderMessage = function(message) {

		//builds the message and appends it to the page
		var gameMessageSet = $("#game-message");
		var newMessage = $("<div>").text(message);
		gameMessageSet.append(newMessage);

		//if we get this specific message passed in, clear the message area
		if(message === "clearMessage") {
			gameMessageSet.text("");
		}

	}

	//This function handles the rendering of characters based on which area they are to be rendered
	var renderCharacters = function(charObj, areaRender) {
		if(areaRender === "#characters-section") {
			$(areaRender).empty();
			//loop through the characters object and call the renderOne function on each character to render their card
			for(var key in charObj){
				if(charObj.hasOwnProperty(key)){
					renderOne(charObj[key], areaRender, "");
				}
			}
		}

		//"selected-character" is the div where our selected character appears
		//if true, render the selected player character to this area
		if(areaRender === "#selected-character"){
			renderOne(charObj, areaRender, "");
		}

		//"available-to-attack" is the div where our "inactive" opponents reside
		//if true, render the selected character to this area
		if(areaRender === "#available-to-attack-section"){

			//loop through the combatants array and call the renderOne function to render their card
			for(var i=0; i<charObj.length; i++){
				renderOne(charObj[i], areaRender, "enemy");
			}

			//create an on click event for each enemy
			$(document).on("click", ".enemy", function(){
				var name = ($(this).attr("data-name"));

				//if there is no defender, the clicked enemy will become the defender
				if($(#defender).children().length === 0){
					renderCharacters(name, "#defender");
					$(this).hide();
					renderMessage("clearMessage");

				}
			});
		};

		//"defender" is the div where the active opponent appears
		//if true, render the selected enemy in this location
		if(areaRender === "#defender") {
			$(areaRender)=empty();
			for(var i=0; i<combatants.length; i++){
				if(combatants[i].name === charObj) {
					renderOne(combatants[i], areaRender, "defender");
				}
			}
		}

		//re-render defender when attacked
		if(areaRender === "playerDamage"){
			$("#defender").empty();
			renderOne(charObj, "#defender", "defender");
		}

		//re-render player when attacked
		if(areaRender === "enemyDamage"){
			$("#selected-character").empty();
			renderOne(charObj, "#selected-character", "");
		}

		//remove defeated enemy
		if(areaRender === "enemyDefeated"){
			$("#defender").empty();
			var gameStateMessage = "You have defeated" + charObj.name + ", you can choose to fight another enemy";
			renderMessage(gameStateMessage);
		}
	};

	//Function which handles restarting the game after victory defeat
	var restartGame = function(inputEndGame) {
		//when the restart button is clicked, reload the game
		var restart = $("<button>Restart</button>").click(function(){
			location.reload();
		});

		//build div that will display the victory/defeat message
		var gameState = $("<div>").text(inputEndGame);

		//render the restart button and victory/defeat message to the page
		$("body").append(gameState);
		$("body").append(restart);
	};

	//Render all characters to the page when game starts
	// renderOne(characters, "#characters-section");
	renderCharacters(characters, "#characters-section");
	// console.log(renderCharacters(characters, "#characters-section"));
	// console.log(renderOne(characters, "#characters-section"));

	//On click event for selecting our character
	$(document).on("click", ".character", function(){
		//saving the clicked charater's name
		var name = $(this).attr("data-name");
		//we populate currSelectedCharacter with the selected character's information
		currSelectedCharacter = characters[name];

		//if a player character has not yet been chosen...
		if(!currSelectedCharacter) {
			//we then loop through the remaining characters and push them to the enemy array
			for(var key in characters){
				if(key !== name) {
					combatants.push(characters[key]);
				}
			}

			//hide the character select div
			$("#characters-section").hide();

			//then render our selected character and our combatants
			renderCharacters(currSelectedCharacter, "#selected-character");
			renderCharacters(combatants, "#available-to-attack-section");
		}
	});


	//when click the attack button, runt the following game logic
	$("#attack-button").on("click", function(){
		//creates message for our attack and our opponent's attack
		var attackMessage = "You attacked " + currDefender.name + " for " + (currSelectedCharacter.attack * turnCounter) + " damages.";
		var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemyAttackBack + " damages.";
		renderMessage("clearMessage");

		if($("#defender").children().length !== 0){

			//reduce defender's health yb ur attack value
			currDefender.health -= (currSelectedCharacter.attack * turnCounter);

			//if the enemy still has health...
			if(currDefender.health > 0){
				//render the enemy's updated character card
				renderCharacters(currDefender, "playerDamage");

				//render the combat message
				renderMessage(attackMessage);
				renderMessage(counterAttackMessage);
				
				//reduce ur health by the opponent's attack value
				currSelectedCharacter.health -= currDefender.enemyAttackBack;

				//render the player's updated character card
				renderCharacters(currSelectedCharacter, "enemyDamage");
			}

			//if u have less than 0 health the game ends
			//we call the restartGame function to allow the user to restart the game
			if(currSelectedCharacter.health <= 0){
				renderMessage("clearMessage");
				restartGame("You have been defeated.. GAME OVER!!");
				$("#attack-button").unbind("click");
			}


			//if the enemy has less than 0 health
			else {
				//remove ur opponent's character card
				renderCharacters(currDefender, "enemyDefeated");
				//increment ur kill count
				killCount++;
				//if u have killed all of ur opponents u win
				//call the restartGame function to allow the user to restart the game
				if(killCount >= 3) {
					renderMessage("clearMessage");
					restartGame("You won! GAME OVER!!");
				}

			}

		}
		turnCounter++;
	});

});