/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { convertToDecimal } from "../../util/Helper";

const Light = ({
  updateVariableValue,
  auto_index,
  light_index,
  value,
  continueGet,
}) => {
  const updateLight = async () => {
    continueGet.current = false;
    //
    const newValue =
      value.slice(0, light_index) +
      (1 - parseInt(value[light_index])).toString() +
      value.slice(light_index + 1);

    console.log("UPDATA LIGHT WHEN CLICKED");
    await updateVariableValue(
      convertToDecimal(newValue),
      "ĐÈN đã được BẬT !",
      "ĐÈN đã được TẮT !",
      1 - parseInt(value[light_index])
    );
    console.log("UPDATA LIGHT AFTER CLICKED");
    //
    continueGet.current = true;
  };
  return (
    <div className="light cursor-pointer">
      <div
        className={`select-none ${
          value[auto_index] == 1 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => {
          if (value[auto_index] == 1) {
            toast.error("Bạn phải tắt MOD AUTO trước!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            updateLight();
          }
        }}
      >
        {value[light_index] == 1 ? (
          <img className="w-[350px] h-[500px]" src="/bulb_on.png" alt="" />
        ) : (
          <img className="w-[350px] h-[500px]" src="/bulb_off.png" alt="" />
        )}
      </div>
    </div>
  );
};

export default Light;
