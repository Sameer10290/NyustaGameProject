import { useMemo, useState } from "react";
import Dice from "./Dice";

export default function Board() {
    const [active, setActive] = useState(0);
    const [currentDiceVaule, setCurrentDiceValue] = useState('');

    const memoizedValue = useMemo(() => {
        const arr = Array.from({ length: 100 }, (_, i) => i + 1);
        const newArr = [];
        while (arr.length) newArr.push(arr.splice(0, 10));
        return newArr;
    }, []);

    const getRandomNumber = (from, to) => {
        const min = Math.ceil(from);
        const max = Math.floor(to);
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return (
        <div id="background">
            <div className="game-board">
                <div className="game-values">
                    <h4> Game Status: {Number(active) === 100 ?
                        'You Win!' : 'In Progress'}</h4>
                    <h4>Current Value of Dice: {currentDiceVaule}</h4>
                    <h4>Player Position: {active ? active : "Outside Board"}</h4>
                </div>

                <div className="game-confg">
                    {active === 0 &&
                        <div className="player">
                            <div className="pulser"></div>
                            <h4>Player</h4>
                        </div>
                    }
                    <Dice
                        active={active}
                        updateActive={setActive}
                        getRandomNumber={getRandomNumber}
                        onhandleDiceValue={(value) => setCurrentDiceValue(value)}
                    />
                </div>

            </div>
            <div className="board">
                <table>
                    <thead>
                        {memoizedValue.map((i, ind) => (
                            <tr key={`tr-${ind}`}>
                                {i.map((ij) => (
                                    <th
                                        key={`th-${ij}`}
                                        className={`${ij === Number(active) ? "pulser" : ""}`}
                                    >
                                        {ij}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                </table>
            </div>
        </div>
    );
}
