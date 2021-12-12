import 'regenerator-runtime/runtime';
import * as Tone from 'tone';
import {frequencyMap} from './constants'


export const startTone = async () => {
  await Tone.start();
  console.log('audio is ready');
  Tone.Transport.start()
}

export const stopTone = async () => {
  Tone.Transport.stop()
}

export const generateSynths = () => {
  const synthList = []
  for (let i = 0; i < 50; i++){
    let newSynth = new Tone.Synth().toDestination();
    newSynth.volume.value = -5
    synthList.push(newSynth)
  }
  return synthList;
}

export const generatePanners = () => {
  const pannerList = []
  for(let i = 0; i < 50; i++){
    let newPanner = new Tone.Panner().toDestination();
    pannerList.push(newPanner)
  }
  return pannerList;
}

export const getRandomInRange = (min, max) => {
  return Math.round(Math.random() * (max - min) + min, 0)
}

export const getPlusOrMinus = () => {
  return Math.random() < 0.5 ? -1 : 1
}

export const generateRandNote = (noteList, randIdx, minOctave, maxOctave) => {
  const randNoteIndex = Math.round(Math.random()*(noteList.length-1));
  const randOctave = getRandomInRange(minOctave, maxOctave)
  const randNote = noteList[randNoteIndex] + randOctave.toString();

  const randFreq = frequencyMap[randNote]
  const randOffset = Math.random() * getPlusOrMinus() * randIdx * .06 * randFreq
  return randFreq + randOffset;
}

export const generateRandPan = () => {
  // weight number towards high end
  let randNumber = 0
  randNumber = Math.random() * .2 + .8
  const scaledNumber = randNumber;
  const randPan = scaledNumber * getPlusOrMinus();
  return randPan;
}

export const randomizeTempo = (baseTempo) => {
  let probability = Math.random()
  if(probability < .3) {
    let newTempo = Math.random() * 50 + baseTempo;
    Tone.Transport.bpm.value = newTempo;
  }
}
