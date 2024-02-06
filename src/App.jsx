import logo from "./logo.svg";
import Grid from "./components/layout/Grid";
function App() {
  return (
    <div className="content flex flex-col">
      <aside className="flex justify-center py-2">
        <h1 className="w-fit">JSON_Jenerator</h1>
      </aside>
      <Grid />
    </div>
  );
}

export default App;
