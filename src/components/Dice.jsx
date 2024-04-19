import React, { useState } from 'react'

const Dice = (props) => {
    const { active, updateActive, getRandomNumber, onhandleDiceValue } = props;
    const [dice, setDice] = useState(null);
    const [rolls, setRolls] = useState(0);
    const [crookedDice, setCrookedDice] = useState(false);

    const rollTheDice = () => {
        setRolls(rolls + 1)
        const diceValue = getRandomNumber(1, 6, crookedDice);
        setDice(diceValue);
        onhandleDiceValue(diceValue);

        if (active === 0 && diceValue === 6)
            updateActive(1);

        if (active > 0)
            updateActive(active + diceValue <= 100 ? active + diceValue : active);

        setTimeout(() => {
            setDice(null);
        }, 500);
    };

    return (
        <>
            <b>Current roll(s) count: {rolls}</b>

            {Number(active) === 100 ? (
                <button
                    type="button"
                    onClick={() => {
                        updateActive(0);
                        setRolls(0);
                    }}
                    className="restart-game"
                >
                    Restart
                </button>
            ) : (
                <button
                    className='game-dice'
                    style={{ fontSize: dice ? "40px" : "20px" }}
                    type="button"
                    onClick={(e) => (dice ? e.preventDefault() : rollTheDice())}
                >
                    {dice || "Roll The dice"}
                </button>
            )}
            <button
                className='toggle-crooked'
                onClick={() => setCrookedDice(!crookedDice)}
                disabled={rolls}
            >
                {crookedDice ? 'Disable Crooked Dice' : 'Enable Crooked Dice'}
            </button>
        </>
    )
}

export default Dice
