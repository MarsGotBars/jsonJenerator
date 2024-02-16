import { useOptionContext } from "context/Optioncontext";
import Title from "components/layout/Title";
export default function Jenerator() {
  const { opt, dataSelect, myData } = useOptionContext();
  const [selectedOption] = opt;
  const [selectedData] = dataSelect;
  const [customData] = myData;
  const fulldata = JSON.stringify(selectedData, null, 1);
  const replacement = JSON.stringify(customData, null, 1);
  const UsableData = () => {
    return (
      <>
        <pre className="text-xs whitespace-pre-wrap">
          {customData != null ? replacement : fulldata}
        </pre>
      </>
    );
  };
  return (
    <>
      {selectedData ? (
        <Title>Output: {selectedOption}</Title>
      ) : (
        <Title>Select a template!</Title>
      )}
      <div className="overflow-y-scroll">
        {customData || fulldata ? <UsableData /> : <></>}
      </div>
    </>
  );
}
