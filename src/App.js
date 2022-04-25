import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Editable,
  EditableTextarea,
  EditablePreview,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  ColorModeScript,
  Progress,
  Stack,
  Button,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { texts } from './data.js';
import useTimer from './hooks/useTimer';

function App() {
  const [selected, setSelected] = useState(0);
  const [sampleTxt, setSampleTxt] = useState(texts[selected]['txt']);
  const [wpm, setWpm] = useState(0);
  const [progress, setProgress] = useState(0);

  const t1 = useTimer(0);

  function countWords(words) {
    //todo: test the new implementation
    const arr = words.split(' ');
    return arr.filter(word => word !== '').length;
  }

  function textChanged(txt) {
    if (txt.length > 0) {
      t1.timerStart();
    } else {
      t1.timerPause();
    }
    console.log('count: ', (countWords(txt) / countWords(sampleTxt)) * 100);
    let currentWpm = 0;
    currentWpm = Math.round(countWords(txt) / (t1.timer / 60));
    setWpm(currentWpm);
    setProgress((countWords(txt) / countWords(sampleTxt)) * 100);
  }

  function handleStart() {
    t1.timerStart();
  }

  function handlePause() {
    t1.timerPause();
  }

  function handleResume() {
    t1.timerResume();
  }

  function handleReset() {
    t1.timerReset();
  }

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={5}>
            <Box minW="100%">
              <StatGroup>
                <Stat>
                  <StatLabel>Time</StatLabel>
                  <StatNumber>{t1.formatTime()}</StatNumber>
                </Stat>

                <Stat>
                  <StatLabel>WPM</StatLabel>
                  <StatNumber>{wpm}</StatNumber>
                </Stat>
                <ColorModeSwitcher />
              </StatGroup>
              <Progress value={progress} />
            </Box>
            <Select
              onChange={e => {
                setSelected(e.target.value);
                setSampleTxt(texts[e.target.value]['txt']);
              }}
            >
              {texts.map(text => (
                <option key={text.id} value={text.id}>
                  {text.name}
                </option>
              ))}
            </Select>
            <Text className="text-sample">{sampleTxt}</Text>
            <Editable
              minW="100%"
              startWithEditView={true}
              placeholder="Start typing here"
              onChange={txt => {
                textChanged(txt);
              }}
            >
              <EditablePreview />
              <EditableTextarea />
            </Editable>
            <Stack direction="row" spacing={4} align="left" bgcolor="grey">
              <Button
                variant="solid"
                isDisabled={t1.isActive}
                onClick={() => handleStart()}
              >
                Start
              </Button>
              <Button
                variant="solid"
                isDisabled={t1.isPaused || !t1.isActive}
                onClick={() => handlePause()}
              >
                Pause
              </Button>
              <Button
                variant="solid"
                isDisabled={!t1.isPaused || !t1.isActive}
                onClick={() => handleResume()}
              >
                Resume
              </Button>
              <Button
                variant="solid"
                isDisabled={t1.timer === 0}
                onClick={() => handleReset()}
              >
                Reset
              </Button>
            </Stack>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
