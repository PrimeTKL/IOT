/* eslint-disable react/prop-types */
import { convertToDecimal } from "../../util/Helper";

const Auto = ({
  updateVariableValue,
  auto_index,
  light_index,
  value,
  continueGet,
}) => {
  const updateAuto = async () => {
    continueGet.current = false;
    const newValue =
      value.slice(0, auto_index) +
      (1 - parseInt(value[auto_index])).toString() +
      value.slice(auto_index + 1);

    console.log("UPDATA AUTO WHEN CLICKED");
    // console.log(convertToDecimal(newValue));

    await updateVariableValue(
      convertToDecimal(newValue),
      "MOD AUTO đã được BẬT !",
      "MOD AUTO đã được TẮT !",
      1 - parseInt(value[auto_index])
    );
    continueGet.current = true;
  };

  return (
    <div className="switch flex flex-col gap-5">
      <div className="text-white font-semibold text-[20px] ml-8 select-none">
        MOD AUTO:
        {value[auto_index] == 1 ? (
          <span className="text-green-500 ml-2">ON</span>
        ) : (
          <span className="text-red-500 ml-2">OFF</span>
        )}
      </div>
      <input
        onClick={() => {
          updateAuto();
        }}
        checked={value[auto_index] == 1 ? true : false}
        type="checkbox"
        name="toggle"
      />
      <label htmlFor="toggle">
        <i className="bulb">
          <span className="bulb-center"></span>
          <span className="filament-1"></span>
          <span className="filament-2"></span>
          <span className="reflections">
            <span></span>
          </span>
          <span className="sparks">
            <i className="spark1"></i>
            <i className="spark2"></i>
            <i className="spark3"></i>
            <i className="spark4"></i>
          </span>
        </i>
      </label>
    </div>
  );
};

export default Auto;
