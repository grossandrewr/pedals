import 'regenerator-runtime/runtime';
import React, { useState } from 'react';
import * as Tone from 'tone';
import {
  OuterBody,
  MainBody,
  ButtonContainer,
  StartStopButton,
  KnobContainer,
  Box,
  Circle,
  Dot,
  KnobLabel,
  BoxContainer,
  RobotRainTitle,
} from './styled';

import { wholeTone } from './constants';
import {
  generateSynths,
  generatePanners,
  generateRandNote,
  generateRandPan,
  randomizeTempo,
} from './utils';

// project setup
let globalTempo = 50;
let globalOctave = 3;
let globalPitch = 0;
let deviceOn = false;

Tone.Transport.bpm.value = globalTempo;
const reverb = new Tone.Reverb(2).toDestination();

// run loop
const synthList = generateSynths();
const pannerList = generatePanners();

let counter = 0;
Tone.Transport.scheduleRepeat(
  time => {
    const index = counter % 50;
    const synthA = synthList[index];
    const pannerA = pannerList[index];

    const randNote = generateRandNote(wholeTone, globalPitch, 3, globalOctave);
    const randPan = generateRandPan();
    pannerA.set({ pan: randPan });

    randomizeTempo(globalTempo);
    counter++;

    synthA
      .triggerAttackRelease(randNote, '32n')
      .connect(pannerA)
      .connect(reverb)
      .toDestination();
  },
  '8n',
  0,
);

const startTone = async () => {
  if (!deviceOn) {
    await Tone.start();
    console.log('audio is ready');
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
  deviceOn = !deviceOn;
};

export default function RainPedal() {
  const [active, setActive] = useState(false);

  const turnKnob = e => {
    const box = e.currentTarget;

    // mouse position
    const mX = e.clientX;
    const mY = e.clientY;

    // element data
    const boxData = box.getBoundingClientRect();
    const boxWidth = boxData.width;
    const boxHeight = boxData.height;
    const { left } = boxData;
    const { top } = boxData;

    // rotation
    let rotate = 0;
    const radians = 180 / Math.PI;
    const center = {
      x: left + boxWidth / 2,
      y: top + boxHeight / 2,
    };

    // arc points
    const x = mX - center.x;
    const y = mY - center.y;
    const angle = Math.floor(Math.atan2(y, x) * radians);
    const startAngle = 180;

    if (active) {
      if (angle > -180 && angle < 0) {
        rotate = angle + startAngle;
        box.style.transform = `rotate(${rotate}deg)`;

        if (box.id === 'tempo-box') {
          globalTempo = 50 + rotate * 1.2;
        } else if (box.id ==='octave-box') {
          globalOctave = 3 + Math.floor(rotate / 60);
        } else if (box.id === 'pitch-box') {
          globalPitch = rotate / 180;
        }
      }
    }
  };

  return (
    <OuterBody onMouseUp={() => setActive(false)}>
      <MainBody>
        <KnobContainer>
          <BoxContainer style={{ top: '30px', left: '40px' }}>
            <Box
              id="tempo-box"
              onMouseDown={() => setActive(true)}
              onMouseMove={turnKnob}
            >
              <Circle>
                <Dot id="dot-1" />
              </Circle>
            </Box>
            <KnobLabel>Tempo</KnobLabel>
          </BoxContainer>
          <BoxContainer style={{ top: '130px', left: '110px' }}>
            <Box
              id="octave-box"
              onMouseDown={() => setActive(true)}
              onMouseMove={turnKnob}
            >
              <Circle>
                <Dot id="dot-2" />
              </Circle>
            </Box>
            <KnobLabel>Pitch</KnobLabel>
          </BoxContainer>
          <BoxContainer style={{ top: '30px', left: '180px' }}>
            <Box
              id="pitch-box"
              onMouseDown={() => setActive(true)}
              onMouseMove={turnKnob}
            >
              <Circle>
                <Dot id="dot-3" />
              </Circle>
            </Box>
            <KnobLabel>Detune</KnobLabel>
          </BoxContainer>
        </KnobContainer>
        <ButtonContainer item>
          <StartStopButton onClick={startTone}>I/O</StartStopButton>
        </ButtonContainer>
        <RobotRainTitle id="title">Robot Rain</RobotRainTitle>
      </MainBody>
    </OuterBody>
  );
}
