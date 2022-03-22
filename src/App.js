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
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { texts } from './data.js';

function App() {
  const [selected, setSelected] = useState(0);
  const [sampleTxt, setSampleTxt] = useState(texts[selected]['txt']);
  const [time, setTime] = useState(0);
  const [wpm, setWpm] = useState(0);

  function textChanged(txt) {
    console.log(txt);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={5}>
            <Box minW="100%">
              <StatGroup>
                <Stat>
                  <StatLabel>Time</StatLabel>
                  <StatNumber>{time}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    0.0%
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>WPM</StatLabel>
                  <StatNumber>{wpm}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    0.0%
                  </StatHelpText>
                </Stat>
                <ColorModeSwitcher joustifySelf="flex-end" />
              </StatGroup>
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
              placeholder="Start typing here"
              onChange={txt => {
                textChanged(txt);
              }}
            >
              <EditablePreview />
              <EditableTextarea />
            </Editable>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
