import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const OuterBody = styled(Grid)`
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: courier, arial, helvetica;
`;

export const MainBody = styled(Grid)`
  border: 2px solid grey;
  border-radius: 10px;
  width: 330px;
  height: 560px;
  position: relative;
  box-shadow: 7px 10px;
  background-color: #b1d3c6;
`;

export const KnobContainer = styled(Grid)`
  width: 330px;
  height: 200px;
  position: relative;
`;

export const BoxContainer = styled(Grid)`
  width: 100px;
  height: 120px;
  position: absolute;
`;

export const Box = styled(Grid)`
  width: 100px;
  height: 100px;
  position: absolute;
  background-color: transparent;
  transform-origin: center center;
  z-index: 1;
  border-radius: 50%;
`;

export const Circle = styled(Grid)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid black;
  box-shadow: 0 0 1px grey, inset 0 0 10px 5px grey;
  background-color: #fff5eb;
`;

export const Dot = styled(Grid)`
  width: 8px;
  height: 8px;
  background-color: black;
  position: absolute;
  top: 40px;
  left: 8px;
  border-radius: 50%;
`;

export const KnobLabel = styled.h4`
  position: absolute;
  left: 25px;
  bottom: 0px;
  font-size: 15px;
  margin: 0;
`;

export const ButtonContainer = styled(Grid)`
  position: absolute;
  left: 60px;
  bottom: 140px;
  width: 65%;
  display: flex;
  justify-content: space-around;
`;

export const StartStopButton = styled(Grid)`
  width: 80px;
  height: 40px;
  font-family: courier, arial, helvetica;
  font-size: 10px;
  border: 2px solid black;
  background-color: #cccccc;
  border-radius: 2px;
`;

export const RobotRainTitle = styled.h3`
  position: absolute;
  left: 60px;
  bottom: 20px;
  color: #fff5eb;
  -webkit-text-stroke: 1px black;
`;
