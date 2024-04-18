import React, { useState } from 'react'

const Dice = (props) => {
    const { active, updateActive, getRandomNumber, onhandleDiceValue } = props
    const [dice, setDice] = useState(null);

    const rollTheDice = () => {
        const diceValue = getRandomNumber(1, 6);
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
            {Number(active) === 100 ? (
                <button
                    type="button"
                    onClick={() => {
                        updateActive(1);
                    }}
                    className="restart-game"
                >
                    Restart
                </button>
            ) : (
                <button
                    className='game-dice'
                    style={{fontSize: dice ? "40px": "20px"}}
                    type="button"
                    onClick={(e) => (dice ? e.preventDefault() : rollTheDice())}
                >
                    {dice || "Roll The dice"}
                </button>
            )}
        </>
    )
}

export default Dice
