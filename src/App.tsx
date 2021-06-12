import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";

import "./App.css";

import { Table } from "./components/Table/Table";

function App() {
  const cb = React.useCallback(() => console.log("Action"), []);
  function makeData() {
    const data = [];
    for (let index = 0; index < 20; index++) {
      data[index] = {
        id: index,
        first: `First-${index}`,
        last: `Last-${index}`,
        action: cb,
      };
    }
    return data;
  }

  const data = makeData();

  return (
    <ChakraProvider>
      <Box width="800px" m="auto" mt="200px">
        <Table data={data} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
