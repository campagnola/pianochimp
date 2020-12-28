import { useState, useEffect } from 'react'
import { update } from 'ramda'
import { PianoOverlay } from './components/piano_overlay'
import './App.css';
window.R = require('ramda')

function App() {
  let inputs, outputs
  const [pressedKeys, setPressedKeys] = useState(new Array(88).fill(false))

  useEffect(() => {
    const onMIDISuccess = (midiAccess) => {
      console.log(midiAccess)

      inputs = midiAccess.inputs
      outputs = midiAccess.outputs

      for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage
      }
    }

    const onMIDIFailure = () => {
      console.log('Could not access your MIDI devices.')
    }

    const getMIDIMessage = (midiMessage) => {
      switch( midiMessage.data[0] ) {      
        case 144: {  // note on
          const keyId = midiMessage.data[1] - 21
          const newPressedKeys = update(keyId, true, pressedKeys)
          console.log("new pressed keyts:", newPressedKeys)
          setPressedKeys(newPressedKeys)
          console.log(keyId)
          break
        }
        case 128: { // note off
          const keyId = midiMessage.data[1] - 21
          setPressedKeys(update(keyId, false, pressedKeys))
          // console.log(keyId)
          break
        }
      }
    }

    navigator.requestMIDIAccess()
      .then(onMIDISuccess, onMIDIFailure)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          noop?
        </p>
        <PianoOverlay pressedKeys={pressedKeys}/>
      </header>
    </div>
  );
}

export default App;
