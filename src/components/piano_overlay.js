import React from 'react';
import { times } from 'ramda';
import './piano_overlay.scss';

const PianoKey = ({keyId, pressed}) => {
    const isBlackKey = [1, 4, 6, 9, 11].includes(keyId % 12)
    const keyClass = isBlackKey ? "PianoKey-black" : "PianoKey-white"
    const xPos = isBlackKey ? keyId*1.136 : keyId*1.923
    const pressClass = pressed ? "PianoKey-pressed" : "PianoKey-unpressed"
    console.log("PianoKey", keyId, pressed)
    return (
        <div className={`PianoKey ${keyClass} ${pressClass}`} style={{left: `${xPos}%`}}></div>
    )
}

export const PianoOverlay = ({pressedKeys}) => {
    console.log("PianoOverlay", pressedKeys)
    return (
        <div className='PianoOverlay'>
            { times(i => <PianoKey keyId={i} key={i} pressed={pressedKeys[i]}></PianoKey>, 88) }
        </div>
    )
}