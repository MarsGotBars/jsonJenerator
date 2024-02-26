import { useOptionContext } from "context/Optioncontext";
import Title from "components/layout/Title";
import { useEffect, useState } from "react";
export default function Jenerator() {
  const { opt, dataSelect, myData } = useOptionContext();
  const [selectedOption] = opt;
  const [selectedData] = dataSelect;
  const [customData] = myData;
  const [copied, setCopied] = useState(0);
  const fulldata = JSON.stringify(selectedData, null, 1);
  const replacement = JSON.stringify(customData, null, 1);
  const hasData = selectedData ? selectedData : (customData && Object.keys(customData).length > 0);
  const clipboardCopy = () => {
    const txtToCopy = customData ? replacement : fulldata
    navigator.clipboard.writeText(txtToCopy)
      .then(()=>{
        
        setCopied(1)
      })
      .catch((error)=>{
        setCopied(2)
      })
    setTimeout(() => {
      setCopied(0)
    }, 1000);
  }
  console.log(copied);
  useEffect(()=>{
    styleJSON()
  }, [fulldata, customData])
  const styleJSON = (original, custom) => {

  }
  const UsableData = () => {
    return (
      <>
        <pre className={`text-xs whitespace-pre-wrap bg-white bg-opacity-0 rounded-xl p-1 mr-2 duration-500 ease-in-out cursor-pointer hover:bg-opacity-10 transition-colors ${copied === 1 ? "hover:bg-green-300" : copied === 2 ? "hover:bg-red" : ''}`} onClick={clipboardCopy}>
          {customData && replacement || fulldata}
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
      <div className="overflow-y-scroll mt-2">
        {hasData ? <UsableData /> : <></>}
      </div>
    </>
  );
}
