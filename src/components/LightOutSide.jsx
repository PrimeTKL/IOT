/* eslint-disable react/prop-types */
import Auto from "./child/Auto";
import Light from "./child/Light";

const LightInside = ({ value, updateVariableValue, continueGet }) => {
  // const [auto, setAuto] = useState(0);
  // const [light, setLight] = useState(0);

  const passProps = {
    updateVariableValue,
    auto_index: 8,
    light_index: 9,
    value,
    continueGet,
  };

  return (
    <>
      <div className="flex items-center justify-center gap-[188px] mt-[100px]">
        <Auto {...passProps} />
        <Light {...passProps} />
      </div>
    </>
  );
};

export default LightInside;
