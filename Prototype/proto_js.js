	
    var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 	920;
	canvas.height = 530;
    document.body.appendChild(canvas);

    var money = 33000;
    var energy = 25000;
    var index = 0,
        oldIndex = 0;

    //////// OBJECTS //////////
    var Bank = {
        name: "Bank",
        moneyGen: 2000
    }

    // Generators
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
    var Solar = {
        name: "Solar",
        cost: 15000,
        energyGen: 4000,
        pollutionDec: 10,
        amount: 0
    }
    var Turbine = {
        name: "Turbine",
        cost: 15000,
        energyGen: 4000,
        pollutionDec: 10,
        amount: 0
    }
    var Windrad = {
        name: "Windrad",
        cost: 10000,
        energyGen: 3000,
        pollutionDec: 8,
        amount: 0
    }

    // Structures
    var EKZ = {
        name: "EKZ",
        cost: 30000,
        energyCost: 9000,
        moneyGen: 6000,
        amount: 0
    }
    var Casino = {
        name: "Casino",
        cost: 25000,
        energyCost: 8000,
        moneyGen: 5000,
        amount: 0
    }
    var Hotel = {
        name: "Hotel",
        cost: 20000,
        energyCost: 7000,
        moneyGen: 4000,
        amount: 0
    }
    var Kino = {
        name: "Kino",
        cost: 15000,
        energyCost: 6000,
        moneyGen: 3000,
        amount: 0
    }
    var Club = {
        name: "Club",
        cost: 15000,
        energyCost: 6000,
        moneyGen: 3000,
        amount: 0
    }
     var mainArray = [
        Solar, 
        Turbine,
        Windrad,
        EKZ,
        Casino,
        Hotel,
        Kino,
        Club
    ];
    var keysDown = {};
    addEventListener("keydown", function(e){
        keysDown[e.keyCode] = true;
    });
    addEventListener("keyup", function(e){
        delete keysDown[e.keyCode];
    });

    //// Functions ////
    var addVariables = function(){
        money += Bank.moneyGen;
        for (let i = 0; i < mainArray.length; i++){
            if (i > 2){
                money += mainArray[i].moneyGen * mainArray[i].amount;
            }  
        }
    }
    var addStructure = function(){
       if(87 in keysDown && money >= actualSpawn.cost){
            money -= mainArray[oldIndex].cost;
            mainArray[oldIndex].amount += 1;
           /* if(index < 2){
                mainArray[index];
            }*/
       }
      
    }
    var write = function(){
       ctx.clearRect(0,0, canvas.width, canvas.height);
       ctx.font = "20px Arial";
       ctx.fillText("Bauen? 'W' Drucken", 50, 50);

       let place = 10
       for(let i = 0; i < mainArray.length/2; i++){ 
            ctx.fillText(mainArray[i].name + ": " + mainArray[i].amount, place, 400);
            place += 150;
       }
       place = 10;
       for(let i = mainArray.length/2; i < mainArray.length; i++){ 
            ctx.fillText(mainArray[i].name + ": " + mainArray[i].amount, place, 500);
            place += 150;
       }


       ctx.font ="30px Arial";
       ctx.fillText(actualSpawn.name, canvas.width/2, canvas.height/4);  
       
   }
   var spawn = function(){
       oldIndex = index; 
        index = Math.floor(Math.random() * mainArray.length); 
       actualSpawn = mainArray[oldIndex];  
       write();
       addStructure();
       addVariables();
       console.log(index);
   }
    setInterval(spawn, 3000)

    
    
