import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";

import "./App.css";

import { Table } from "./components/Table/Table";

function App() {
  const cb = React.useCallback(() => console.log("Action"), []);
  function makeData() {
    const data = [];
    for (let index = 0; index < 40; index++) {
      data[index] = {
        id: index,
        first: `First-${index}`,
        last: `Last-${index}`,
        action: cb,
      };
    }
    return data;
  }

  function shuffle(array: any) {
    return array.sort(() => Math.random() - 0.5);
  }

  const data = shuffle(makeData());

  return (
    <ChakraProvider>
      <Box width="800px" m="auto" mt="100px">
        <Table data={data} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
