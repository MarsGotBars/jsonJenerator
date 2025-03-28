import Title from "components/layout/Title";
import { useOptionContext } from "context/Optioncontext";
import { useCallback, useEffect, useState } from "react";
import { useSendProduct } from "hooks/usePost";
export default function Jenerator() {
  const { opt, dataSelect, myData, vars, failures, state } = useOptionContext();
  const [ready] = state;
  const [amountVariations] = vars;
  const [amountFailures] = failures;
  const [selectedOption] = opt;
  const [selectedData] = dataSelect;
  const [productCompletion, setProductCompletion] = useState(false);
  const [customData] = myData;
  const fulldata = JSON.stringify(selectedData, null, 1);
  const replacement = JSON.stringify(customData, null, 1);
  const hasData = selectedData
    ? selectedData
    : customData && Object.keys(customData).length > 0;
  const { mutate: sendData, status, reset, error } = useSendProduct();
  const handleClick = () => {
    if (ready === false) return;
    const data = customData;
    sendData(data);
  };
  useEffect(() => {
    styleJSON();
  }, [fulldata, customData]);
  const styleJSON = (original, custom) => {};
  const UsableData = () => {
    return (
      <>
        <pre
          className={`text-xs whitespace-pre-wrap bg-green-400 bg-opacity-0 rounded-xl p-1 mr-2 duration-500 ease-in-out transition-colors hover:bg-opacity-10 ${
            ready ? "cursor-pointer" : "bg-red"
          }`}
          onClick={handleClick}
        >
          {(customData && replacement) || fulldata}
        </pre>
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 bottom-0 flex flex-col items-center opacity-0 ${
            status === "success" || status === "error" ? "animate-fade-in" : ""
          } ${productCompletion ? "animate-fade-out" : ""}`}
        >
          <div
            className={`backdrop-blur-sm pointer-events-none ${
              status !== "error" ? "bg-green-400/50" : "bg-red/50"
            }  w-fit text-center text-white p-2 rounded-2xl mb-2`}
          >
            <p>
              Product operation {status !== "error" ? "complete!" : "failed"}
            </p>
            {status !== "error" ? (
              <div className="flex flex-col">
                <span>{amountVariations} variations added!</span>
                {!(amountFailures !== "0") && (
                  <span>{amountFailures} failed!</span>
                )}
              </div>
            ) : (
              <div className="flex flex-col">
                <span>error code: {error?.response?.data?.data.status}</span>
                <span>
                  {error.response.data.code === "product_invalid_sku"
                    ? "heb je de correcte steen soort?"
                    : error.response.data.code}
                </span>
                <span>{error.response.data.message}</span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
  const Overlay = () => {
    return (
      <div className="h-full w-full bg-slate-800/50 absolute inset-0 rounded-2xl backdrop-blur-sm grid place-items-center">
        {status === "success" ? (
          "sent"
        ) : (
          <>
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-slate-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </>
        )}
      </div>
    );
  };
  const rmOverlay = useCallback(() => {
    setTimeout(() => {
      setProductCompletion(true);
    }, 3400);
    setTimeout(() => {
      setProductCompletion(false);
      reset();
    }, 4000);
  }, [reset]);
  useEffect(() => {
    (status === "success" || status === "error") && rmOverlay();
  }, [status, rmOverlay]);
  return (
    <>
      {selectedData ? (
        <Title>Output: {selectedOption}</Title>
      ) : (
        <Title>Select a template!</Title>
      )}
      <div className="overflow-y-scroll overflow-x-clip mt-2">
        {status !== "idle" && <Overlay />}
        {hasData ? (
          <UsableData />
        ) : (
          <p className="text-xs">Or enjoy this empty box :)</p>
        )}
      </div>
    </>
  );
}
