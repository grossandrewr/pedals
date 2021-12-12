import 'regenerator-runtime/runtime';
import React, {useState} from 'react';
import { OuterBody, MainBody, ButtonContainer, StartStopButton, KnobContainer,
        Box, Circle, Dot, KnobLabel } from './styled';
import Grid from '@material-ui/core/Grid';

import * as Tone from 'tone';
import {wholeTone} from './constants'
import {
    generateSynths,
    generatePanners,
    generateRandNote,
    generateRandPan,
    randomizeTempo,
    startTone,
    stopTone }
  from './utils'

//project setup
let globalTempo = 50;
let globalOctave = 3;
let globalPitch = 0
Tone.Transport.bpm.value = globalTempo;
const reverb = new Tone.Reverb(2).toDestination()

// run loop
const synthList = generateSynths()
const pannerList = generatePanners()

let counter = 0;
Tone.Transport.scheduleRepeat(time => {
  let index = counter % 50
  const synthA = synthList[index]
  const pannerA = pannerList[index]

  const randNote = generateRandNote(wholeTone, globalPitch, 3, globalOctave);
  const randPan = generateRandPan();
  pannerA.set({pan: randPan})

  randomizeTempo(globalTempo);
  counter++;

  synthA.triggerAttackRelease(randNote, '32n').connect(pannerA).connect(reverb).toDestination()
}, "8n", 0);

export default function RainPedal() {
  const [active, setActive] = useState(false);

  const turnKnob = (e) => {
    const box = e.currentTarget;

    //mouse position
    let mX = e.clientX;
    let mY = e.clientY;

    //element data
    let boxData = box.getBoundingClientRect();
    let boxWidth = boxData.width;
    let boxHeight = boxData.height;
    let left = boxData.left;
    let top = boxData.top;

    //rotation
    let rotate = 0;
    let radians = 180 / Math.PI;
    let center = {
      x: left + (boxWidth / 2),
      y: top + (boxHeight / 2)
    }

    // arc points
    let x = mX - center.x;
    let y = mY - center.y;
    let angle = Math.floor(Math.atan2(y, x) * radians);
    let startAngle = 180;

    if (active) {
      if (angle > -180 && angle < 0) {
        rotate = angle + startAngle;
        box.style.transform = `rotate(${rotate}deg)`;

        if (box.id == "tempo-box") {
          globalTempo = 50 + rotate * 1.2;
        } else if (box.id == "octave-box") {
          globalOctave = 3 + Math.floor(rotate / 60);
        } else if (box.id == "pitch-box") {
          globalPitch = rotate / 180;
        }
      }
    }
  }

  return (
    <OuterBody onMouseUp={() => setActive(false)}>
      <MainBody>
        <h1 id="title">Robot Rain</h1>
        <Grid>
          <KnobContainer
            onMouseDown={() => setActive(true)}
            style={{ left: '25%'}}
          >
            <Box id="tempo-box" onMouseMove={turnKnob}>
              <Circle>
                <Dot id="dot-1"></Dot>
              </Circle>
            </Box>
            <KnobLabel>Tempo</KnobLabel>
          </KnobContainer>
          <KnobContainer
            onMouseDown={() => setActive(true)}
            style={{ left: '45%'}}
          >
            <Box id="octave-box" onMouseMove={turnKnob}>
              <Circle>
                <Dot id="dot-2"></Dot>
              </Circle>
            </Box>
            <KnobLabel>Pitch</KnobLabel>
          </KnobContainer>
          <KnobContainer
            onMouseDown={() => setActive(true)}
            style={{ left: '65%'}}
          >
            <Box id="pitch-box" onMouseMove={turnKnob}>
              <Circle>
                <Dot id="dot-3"></Dot>
              </Circle>
            </Box>
            <KnobLabel>Detune</KnobLabel>
          </KnobContainer>
          <ButtonContainer>
            <StartStopButton onClick={startTone}>Start</StartStopButton>
            <StartStopButton onClick={stopTone}>Stop</StartStopButton>
          </ButtonContainer>
        </Grid>
      </MainBody>
    </OuterBody>
  )
}
