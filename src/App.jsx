import logo from "./logo.svg";
import Grid from "components/layout/Grid";
function App() {
  return (
    <div className="content flex flex-col max-h-screen">
      <aside className="flex max-h-[10%] justify-center py-2">
        <h1 className="w-fit text-white text-xl font-bold">JSON Jenerator</h1>
      </aside>
      <Grid classes="grid grid-rows-2 grid-cols-5 gap-4 p-4 pt-0 flex-grow h-[90%]"/>
    </div>
  );
}

export default App;
