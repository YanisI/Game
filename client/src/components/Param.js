import React, { useState } from 'react'

const Param = ({handleValidate}) => {

    const [round, setRound] = useState("20");
    const [time, setTime] = useState("30");

    const changeTime = (e) => {
    }
    return (
        <div className='settings-container'>

            <p className="title"s>
                Game Settings
            </p>
            <div className="settings-wrapper">
                <div className="item">
                    <label for="round">Round</label>
                    <select className='select' name="round">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20" selected>20</option>
                        <option value="30">30</option>
                    </select>

                </div>
                <div className="item">
                    <label for="time">Time by question</label>
                    <select className='select' name="time" onChange={handleParam}>
                        <option value="20">20</option>
                        <option value="30" selected>30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </select>

                </div>
            </div>


            <button
                className='validate'
                onClick={handleValidate}
            >
                Validate
            </button>

        </div>
    )
}

export default Param