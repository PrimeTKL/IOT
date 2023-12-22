/* eslint-disable react/prop-types */
import Auto from "./child/Auto";
import Temp from "./child/Temp";
import FasnChild from "./child/FasnChild";

const Fan = ({ value, temp, updateVariableValue, continueGet }) => {
  // const [auto, setAuto] = useState(0);
  // const [light, setLight] = useState(0);

  const passProps = {
    updateVariableValue,
    auto_index: 4,
    light_index: 5,
    value, //de dung value nay doi 0 thanh 1, 1 thanh 0 -> chuyen ve thap phan --> send
    continueGet,
  };

  return (
    <>
      <div className="flex items-center justify-center gap-[188px] mt-[200px]">
        <Auto {...passProps} />
        <FasnChild {...passProps} />
        <Temp temp={temp} />
      </div>
    </>
  );
};

export default Fan;
