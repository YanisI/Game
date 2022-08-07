import React from 'react'
import { ReactComponent as Random } from '../images/random.svg';


const Avatar = ({ seed, setSeed, sprite, setSprite }) => {

    let tab = [
        { nom: "Human", av: "avataaars" },
        { nom: "Pixel", av: "human" },
        { nom: "Bots", av: "bottts" },
        { nom: "Vector", av: "jdenticon" },
        { nom: "Identi", av: "identicon" },
        { nom: "Alien", av: "gridy" },
        { nom: "Avatars", av: "micah" },];

    const handleRandom = () => {
        setSprite(tab[Math.floor(Math.random() * 7)].av);
        setSeed(Math.floor(Math.random() * 1000000));
    }

    return (
        <div className='avatar'>
            <div className="buttons">
                {tab.map((a, i) => {
                    return (
                        <button
                            key={i}
                            className={sprite === a.av ? "active button" : "button"}
                            onClick={() => { setSprite(a.av) }}
                        >
                            {a.nom}
                        </button>)
                })}
            </div>
            <div className="wrapper">
                <div
                    className="random"
                    onClick={handleRandom}
                >
                    <Random className="randomSVG"/>
                </div>
                <div
                    className="side"
                    onClick={() => setSeed(seed - 1)}
                >
                    &lsaquo;
                </div>
                <div className="avatar-picture">
                    <img
                        src={`https://avatars.dicebear.com/api/${sprite}/${seed}.svg?scale=100`}
                        alt="Sprite"
                    />
                </div>
                <div
                    className="side"
                    onClick={() => setSeed(seed + 1)}
                >
                    &rsaquo;
                </div>
            </div>
        </div>
    )
}

export default Avatar;