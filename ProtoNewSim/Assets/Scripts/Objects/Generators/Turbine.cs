using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Turbine : Objects {
	public Turbine(){
		name = "Turbine";
		cost = 15000;
		energyGen = 4000;
		pollutionDec = 10;
		amount = 0;
		energyCost = 0;
	}

}
