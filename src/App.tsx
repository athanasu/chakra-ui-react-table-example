import { ChakraProvider, Center } from "@chakra-ui/react";

import "./App.css";

import { Table } from "./components/Table";

function App() {
  const data = [
    {
      id: 0,
      first: "G",
      last: "A",
      action: () => console.log("action"),
    },
  ];

  return (
    <ChakraProvider>
      <Center width="800px" m="auto" mt="200px">
        <Table data={data} />
      </Center>
    </ChakraProvider>
  );
}

export default App;
