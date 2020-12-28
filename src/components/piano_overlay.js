import React from 'react';
import { times } from 'ramda';
import './piano_overlay.scss';

const PianoKey = ({keyId}) => {
    const isBlackKey = [1, 4, 6, 9, 11].includes(keyId % 12)
    const keyClass = isBlackKey ? "PianoKey-black" : "PianoKey-white"
    return (
        <div class={`PianoKey ${keyClass}`} style={{left: `${keyId*1.136}%`}}>{keyId}</div>
    )
}

export const PianoOverlay = (props) => {

    return (
        <div class='PianoOverlay'>
            Piano overlay
            { times(i => <PianoKey keyId={i}></PianoKey>, 88) }
        </div>
    )
}