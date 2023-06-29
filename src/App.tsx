import { ExampleTemplate } from "./components/example-template";
import { StackBasic } from "./components/stackBasic";

function App() {
  return (
    <ExampleTemplate
      title="Stack Viewport API"
      paragraph="Demonstrates how to interact with a Stack viewport."
      content={<StackBasic />}
    />
  );
}

export default App;
