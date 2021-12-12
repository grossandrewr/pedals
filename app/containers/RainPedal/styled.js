import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export const OuterBody = styled(Grid)`
  height:500px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: courier,arial,helvetica;
`

export const MainBody = styled(Grid)`
  border: 2px solid grey;
  border-radius: 10px;
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 7px 10px;
`

export const ButtonContainer = styled(Grid)`
  width: 65%;
  display: flex;
  justify-content: space-around;
`

export const StartStopButton = styled(Button)`
  width:80px;
  height: 40px;
  font-family: courier,arial,helvetica;
`

export const KnobContainer = styled(Grid)`
  position: absolute;
  width: 200px;
  height: 200px;
  top: 40%;
`

export const Box = styled(Grid)`
  width: 100px;
  height: 100px;
  background-color: transparent;
  position: absolute;
  left: 25%;
  top: 25%;
  transform-origin: center center;
  z-index: 1;
  border-radius: 50%;
`

export const Circle = styled(Grid)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid black;
  box-shadow: 0 0 10px grey, inset 0 0 10px 5px grey;
`

export const Dot = styled(Grid)`
  width: 8px;
  height: 8px;
  background-color: black;
  position: absolute;
  top: 40px;
  left: 8px;
  border-radius: 50%;
`

export const KnobLabel = styled.h4`
  position: absolute;
  left: 40%;
  top: 80%;
`
