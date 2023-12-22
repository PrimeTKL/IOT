/* eslint-disable react/prop-types */
import { convertToDecimal } from "../../util/Helper";
import { toast } from "react-toastify";

const FasnChild = ({
  updateVariableValue,
  auto_index,
  light_index,
  value,
  continueGet,
}) => {
  const updateFan = async () => {
    continueGet.current = false;
    const newValue =
      value.slice(0, light_index) +
      (1 - parseInt(value[light_index])).toString() +
      value.slice(light_index + 1);

    console.log("UPDATA LIGHT WHEN CLICKED");
    await updateVariableValue(
      convertToDecimal(newValue),
      "QUẠT đã được BẬT !",
      "QUẠT đã được TẮT !",
      1 - parseInt(value[light_index])
    );
    continueGet.current = true;
  };
  return (
    <>
      <div
        className={`fan-child select-none ${
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
            updateFan();
          }
        }}
      >
        <div
          style={{
            animation:
              value[light_index] == 1 ? "spin 6ms linear infinite" : "",
          }}
          className="ceiling-container"
        >
          <div className="ceiling-fan horizontal left"></div>
          <div className="ceiling-fan horizontal right"></div>
          <div className="ceiling-fan vertical rotated top"></div>
          <div className="ceiling-fan vertical rotated bottom"></div>
        </div>
      </div>
    </>
  );
};

export default FasnChild;
