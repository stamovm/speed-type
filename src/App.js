import { useState, useRef } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Textarea,
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
  const [markedTxt, setMarkedTxt] = useState(sampleTxt);
  const [wpm, setWpm] = useState(0);
  const [errors, setErrors] = useState(0);
  const [progress, setProgress] = useState(0);
  const inputEl = useRef(null);

  const t1 = useTimer(0);

  function countWords(words) {
    const arr = words.split(' ');
    return arr.filter(word => word !== '').length;
  }

  function markText(txt, words) {
    let tmpTxt = '';
    let errCount = 0;
    for (let i = 0; i < sampleTxt.length; i++) {
      if (sampleTxt[i] === txt[i]) {
        tmpTxt += `<span class="correct">${sampleTxt[i]}</span>`;
      } else {
        if (txt[i] !== undefined) {
          tmpTxt += `<span class="wrong">${sampleTxt[i]}</span>`;
          errCount++;
        } else {
          tmpTxt += sampleTxt[i];
        }
      }
    }
    console.log('--', words);
    setErrors(errCount);
    setMarkedTxt(tmpTxt);
  }

  function textChanged(txt) {
    let currentWpm = 0;
    let typedWords = countWords(txt);
    let totalWords = countWords(sampleTxt);
    currentWpm = Math.round(typedWords / (t1.timer / 60));
    setWpm(currentWpm);
    setProgress((typedWords / totalWords) * 100);
    markText(txt, typedWords);
  }

  function handleStart() {
    t1.timerStart();
    setTimeout(() => inputEl.current.focus(), 100);
  }

  function handlePause() {
    t1.timerPause();
  }

  function handleResume() {
    t1.timerResume();
    setTimeout(() => inputEl.current.focus(), 100);
  }

  function handleReset() {
    t1.timerReset();
    setWpm(0);
    setMarkedTxt(sampleTxt);
    inputEl.current.value = '';
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
                <Stat>
                  <StatLabel>Errors</StatLabel>
                  <StatNumber>{errors}</StatNumber>
                </Stat>

                <ColorModeSwitcher />
              </StatGroup>
              <Progress value={progress} />
            </Box>

            <Text
              className="text-sample"
              dangerouslySetInnerHTML={{
                __html: markedTxt,
              }}
            ></Text>

            <Textarea
              ref={inputEl}
              minH="5rem"
              placeholder="Start typing here"
              isDisabled={t1.isPaused || !t1.isActive}
              onChange={e => {
                textChanged(e.target.value);
              }}
            />
            <Stack direction="row" spacing={4} align="left" bgcolor="grey">
              <Button
                variant="solid"
                isDisabled={t1.isActive}
                onClick={handleStart}
              >
                Start
              </Button>
              <Button
                variant="solid"
                isDisabled={t1.isPaused || !t1.isActive}
                onClick={handlePause}
              >
                Pause
              </Button>
              <Button
                variant="solid"
                isDisabled={!t1.isPaused || !t1.isActive}
                onClick={handleResume}
              >
                Resume
              </Button>
              <Button
                variant="solid"
                isDisabled={t1.timer === 0}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Select
                maxW="14rem"
                onChange={e => {
                  setSelected(e.target.value);
                  setSampleTxt(texts[e.target.value]['txt']);
                  setMarkedTxt(texts[e.target.value]['txt']);
                }}
              >
                {texts.map(text => (
                  <option key={text.id} value={text.id}>
                    {text.name}
                  </option>
                ))}
              </Select>
            </Stack>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
