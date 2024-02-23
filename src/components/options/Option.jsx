import data from "../../data/data";
import { useOptionContext } from "../../context/Optioncontext";

export default function Option({ option }) {
  const { opt, dataSelect } = useOptionContext();
  const [selectedOption, setSelectedOption] = opt;
  const [selectedData, setSelectedData] = dataSelect

  const handleClick = () => {
    setSelectedOption(option);
    setSelectedData(data[option])
  };

  return (
    <div
      className={`${
        selectedOption === option ? "border-red text-red bg-slate-100" : ""
      } hover:border-red hover:text-red rounded-xl duration-300 cursor-pointer h-full w-full grid place-content-center border-2`}
      onClick={handleClick}
    >
      <h3 className="text-l font-bold">{option}</h3>
    </div>
  );
}
