	
    var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 	920;
	canvas.height = 530;
    document.body.appendChild(canvas);
	canvas.style.border = '1px solid #000';


    var money = 33000;
    var energy = 25000;
	var pollution  = 100;
	var ticker= 0;
	var generatedIndex = 0;
	var newRound = true;
	var objectBought = false;


    //////// OBJECTS //////////
    var Bank = {
        name: "Bank",
        moneyGen: 2000,
		amount:1,
    }
	var Atom = {
		name: "Atom",
		eneryGen: 15000,
		deconsMoney: 45000,
		pollutionDec: 35,
		amount: 1
	}

	var Kohle = {
		name: "Kohle",
		energyGen: 10000,
		deconsMoney: 40000,
		pollutionDec: 35,
		amount: 1
	}

    // Generators
	var objects = [

			Solar = {
				name: "Solar",
				cost: 15000,
				energyGen: 4000,
				pollutionDec: 10,
				amount: 0
			},
			Turbine = {
				name: "Turbine",
				cost: 15000,
				energyGen: 4000,
				pollutionDec: 10,
				amount: 0
			},
			Windrad = {
				name: "Windrad",
				cost: 10000,
				energyGen: 3000,
				pollutionDec: 8,
				amount: 0
			},

			// Structures
			EKZ = {
				name: "EKZ",
				cost: 30000,
				energyCost: 9000,
				moneyGen: 6000,
				amount: 0
			},
			Casino = {
				name: "Casino",
				cost: 25000,
				energyCost: 8000,
				moneyGen: 5000,
				amount: 0
			},
			Hotel = {
				name: "Hotel",
				cost: 20000,
				energyCost: 7000,
				moneyGen: 4000,
				amount: 0
			},
			Kino = {
				name: "Kino",
				cost: 15000,
				energyCost: 6000,
				moneyGen: 3000,
				amount: 0
			},
			Club = {
				name: "Club",
				cost: 15000,
				energyCost: 6000,
				moneyGen: 3000,
				amount: 0
			},
		]
	function generateObject() {
		generatedIndex = Math.floor(Math.random()* (objects.length ));
	}
	
	
	function displayAllObjects(){
		ctx.font = "10px Helvetica";
		ctx.fillText(Bank.name +": " + Bank.amount, canvas.width - 150, 20 );
		ctx.fillText(Atom.name + ": " + Atom.amount, canvas.width - 150,40);
		ctx.fillText(Kohle.name + ": " + Kohle.amount, canvas.width - 150,60);

		let place = 20;
		for (i in objects){
			ctx.fillText(objects[i].name + ": " + objects[i].amount, canvas.width - 100, place);
			place += 20;
		}
	}
	
	function displayCurrentStats(){
		ctx.font="20px Arial";
		ctx.fillText("Money: " + money, 50,40);
		ctx.fillText("Energy: " + energy, 50,60);
		ctx.fillText("Pollution: " + pollution, 50,80);	
	}
	function renewStats(){
		money += Bank.moneyGen;	
	}
	function displayObjectStats(){
		ctx.font = "20px Helvetica";
		if(generatedIndex >=3){
			ctx.fillText("Cost: "+objects[generatedIndex].cost,70,200);
			ctx.fillText("Energy using: "+objects[generatedIndex].energyCost,70,220);
			ctx.fillText("Money generating each round: "+objects[generatedIndex].moneyGen,70,240);
		}
		else{
			ctx.fillText("Cost: "+objects[generatedIndex].cost,70,200);
			ctx.fillText("Energy generating: "+objects[generatedIndex].energyGen,70,220);
			ctx.fillText("Pollution decreasing: -"+objects[generatedIndex].pollutionDec,70,240);			
			
		}
			
		
	}
	
	
	
	
    var keysDown = {};
    addEventListener("keydown", function(e){
        keysDown[e.keyCode] = true;
    });
    addEventListener("keyup", function(e){
        delete keysDown[e.keyCode];
    });

    //// Functions ////

	
	
    var write = function(){
	ctx.clearRect(0,0, canvas.width, canvas.height);	
		if(87 in keysDown && newRound && objects[generatedIndex].cost <= money){
			newRound = false;
			objectBought = true;
			
			objects[generatedIndex].amount++;
			money -= objects[generatedIndex].cost;
			if(generatedIndex >= 3){ 							//Gebäude
				energy -= objects[generatedIndex].energyCost;
				Bank.moneyGen += objects[generatedIndex].moneyGen;
			}
			else{												//EnergieGeneratoren
				energy += objects[generatedIndex].energyGen;
				pollution -= objects[generatedIndex].pollutionDec;
			}

		}
		else{
			objectBought = false;
		}

		ticker++;
		if(ticker % 200 == 0){
			newRound = true;
			generateObject();
			renewStats();

		}
	
		displayObjectStats();		
		displayAllObjects();
		displayCurrentStats();
		
		ctx.font = "20px Arial";
		ctx.fillText("Bauen? 'W' Drucken", canvas.width/2-50, 50);
		ctx.font ="30px Arial";
		ctx.fillText(objects[generatedIndex].name,canvas.width/2,canvas.height/2);
		
       
   }
   
   
   
   
   
   
   
   
   
   
   var spawn = function(){
       write();
	   window.requestAnimationFrame(spawn);
   }
	spawn();

    
    
