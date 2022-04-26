import { useEffect, useState } from "react";

interface Unit {
  id: number;
  name: string;
  attack: number;
  armor: string;
  cost: Cost;
  howManyYouCanAfford?: number;
}

interface Cost {
  Wood?: number;
  Food?: number;
  Gold?: number;
  Stone?: number;
}

export function RestController() {
  const BASE_URL = "http://aoe2.devops.sages.pl/api/v1/units";

  const [units, setUnits]: Unit | any = useState([]);
  const [allUnits, setAllUnits]: any | Unit = useState([]);
  const [woodAmount, setWoodAmount]: number | any = useState(0);
  const [foodAmount, setFoodAmount]: number | any = useState(0);
  const [goldAmount, setGoldAmount]: number | any = useState(0);
  const [stoneAmount, setStoneAmount]: number | any = useState(0);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((response) => {
        setAllUnits(response.units);
        setUnits(response.units);
      });
  }, []);

  function handleWoodChange(event: React.ChangeEvent<HTMLInputElement>) {
    setWoodAmount(event.target.value);
  }

  function handleFoodChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFoodAmount(event.target.value);
  }

  function handleGoldChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGoldAmount(event.target.value);
  }

  function handleStoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStoneAmount(event.target.value);
  }

  function handleCountCapabilities() {
    const unitsYouCanAfford = allUnits.filter((unit: Unit) => {
      let youCanAfford: number = Infinity;

      if (unit.cost.Wood) {
        youCanAfford = Math.min(
          Math.floor(woodAmount / unit.cost.Wood),
          youCanAfford
        );
      }

      if (unit.cost.Food) {
        youCanAfford = Math.min(
          Math.floor(foodAmount / unit?.cost?.Food),
          youCanAfford
        );
      }
      if (unit.cost.Gold) {
        youCanAfford = Math.min(
          Math.floor(goldAmount / unit?.cost?.Gold),
          youCanAfford
        );
      }
      if (unit.cost.Stone) {
        youCanAfford = Math.min(
          Math.floor(stoneAmount / unit?.cost?.Stone),
          youCanAfford
        );
      }

      if (youCanAfford === Infinity) {
        youCanAfford = 0;
      }
      unit.howManyYouCanAfford = youCanAfford;
      return youCanAfford;
    });

    setUnits(unitsYouCanAfford);
  }

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="header">
            <h3>Uzupełnij swoje surowce</h3>
          </div>
          <div className="container-label">
            <label>Drewno:</label>
            <input
              value={woodAmount}
              onChange={handleWoodChange}
              type="number"
            ></input>
            <label>Żywność:</label>
            <input
              value={foodAmount}
              onChange={handleFoodChange}
              type="number"
            ></input>
            <label>Złoto:</label>
            <input
              value={goldAmount}
              onChange={handleGoldChange}
              type="number"
            ></input>
            <label>Kamień:</label>
            <input
              value={stoneAmount}
              onChange={handleStoneChange}
              type="number"
            ></input>
            <button onClick={handleCountCapabilities} className="oblicz">
              Oblicz!
            </button>
          </div>
        </div>
      </div>
      <div className="result">
        {units.map((unit: Unit) => (
          <div className="aoe-units">
            <p>{unit.id}.</p>
            <p>{unit.name}</p>
            <p>
              <img className="attack-icon" src="Attack.png"></img>
              {unit.attack}
            </p>
            <p>
              <img className="armor-icon" src="armor.png"></img>
              {unit.armor}
            </p>
            <p>{unit.howManyYouCanAfford}</p>
          </div>
        ))}
      </div>
    </>
  );
}
