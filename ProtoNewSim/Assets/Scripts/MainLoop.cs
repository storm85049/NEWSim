using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MainLoop : MonoBehaviour {

	// Variables///
	Objects[] objects;
	Bank bank;
	Atom atom;
	Kohle kohle;
	int money;
	int energy;
	int pollution;
	int ticker;
	int generatedIndex;
	bool newRound;
	bool akwDestroy;
	bool kohleDestroy;
	public GameObject test;

	// Functions ///
	public void renewStats(){
		money += bank.moneyGen;
	}
	public void generateObject() {
		generatedIndex = Random.Range(0,7);
	}
	public void checkIfDestructible(){
		if(money >= atom.deconsMoney && energy >= atom.energyGen && atom.amount != 0){
			akwDestroy = true;
		}
		
		if(money >= kohle.deconsMoney && energy >= kohle.energyGen && kohle.amount != 0){
			kohleDestroy = true;	
		}
	}
	public void checkDestruct(){
		if(Input.GetKeyDown(KeyCode.UpArrow) && akwDestroy){
			energy -= atom.energyGen; 
			pollution -= atom.pollutionDec;
			money -= atom.deconsMoney;
			akwDestroy = false;
			atom.amount -= 1;
		}
		if(Input.GetKeyDown(KeyCode.DownArrow) && kohleDestroy){
			energy -= kohle.energyGen;
			pollution -= kohle.pollutionDec;
			money -= kohle.deconsMoney;
			kohleDestroy = false;
			kohle.amount-= 1;

		}
	}
	public void gameLoop(){
		if (Input.GetKeyDown("space") && newRound && objects[generatedIndex].cost <= money && objects[generatedIndex].energyCost <= energy){
			newRound = false;
			objects[generatedIndex].amount++;
			money -= objects[generatedIndex].cost;
			if(generatedIndex >= 3){ 							//Gebäude
				energy -= objects[generatedIndex].energyCost;
				bank.moneyGen += objects[generatedIndex].moneyGen;
			}
			else{												//EnergieGeneratoren
				energy += objects[generatedIndex].energyGen;
				pollution -= objects[generatedIndex].pollutionDec;
			}
		}
		checkIfDestructible();
	}

	public void drawSelection(){
		Instantiate(test);

	}
	void Start () {
		// Initialization of Variables
		money = 43000;
		energy = 25000;
		pollution = 100;
		ticker = 0;
		newRound = true;
		akwDestroy = false;
		kohleDestroy = false;
		// Init. Objects
		bank = new Bank();
		atom = new Atom();
		kohle = new Kohle();
		objects = new Objects[7];
		objects[0] = new Solar();
		objects[1] = new Turbine();
		objects[2] = new Wind();
		objects[3] = new EKZ();
		objects[4] = new Casino();
		objects[5] = new Hotel();
		objects[5] = new Cinema();
		objects[6] = new Club();
		
	}

	void Update () {
		if (ticker >= 150){
			ticker = 0;
			newRound = true;
			renewStats();
			generateObject();
			
		}
		drawSelection();
		checkDestruct();
		gameLoop();
		ticker++;
		Debug.Log(generatedIndex + " " + bank.moneyGen + " " + money + " " + energy + " " + akwDestroy);
	}
}
