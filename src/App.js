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
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { texts } from './data.js';

function App() {
  const [selected, setSelected] = useState(0);
  const [sampleTxt, setSampleTxt] = useState(texts[selected]['txt']);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Select
              onChange={e => {
                setSelected(e.target.value);
                setSampleTxt(texts[selected]['txt']);
              }}
              placeholder="Select text example"
            >
              {texts.map(text => (
                <option value={text.id}>{text.name}</option>
              ))}
            </Select>
            <Text className="text-sample">{sampleTxt}</Text>
            <Editable defaultValue="Start typing here">
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
