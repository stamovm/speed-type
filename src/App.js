import React from 'react';
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
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text>
              this is a simple paragraph that is meant to be nice and easy to
              type which is why there will be mommas no periods or any capital
              letters so i guess this means that it cannot really be considered
              a paragraph but just a series of run on sentences this should help
              you get faster at typing as im trying not to use too many
              difficult words in it although i think that i might start making
              it hard by including some more difficult letters I am typing
              pretty quickly so forgive me for any mistakes i think that i will
              not just tell you a story about the time i went to the zoo and
              found a monkey and a fox playing together they were so cute and i
              think that they were not supposed to be in the same cage but they
              somehow were and i loved watching them horse around forgive the
              pun well i hope that it has been highly enjoyable typing this
              paragraph and i wish you the best of luck getting the best score
              that you possibly can
            </Text>
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
