export default function convertToBinary(decimalNumber) {
  let binary = decimalNumber.toString(2);
  const binaryLength = binary.length;
  if (binaryLength < 10) {
    binary = "0".repeat(10 - binaryLength) + binary;
  }
  return binary;
}

export function convertToDecimal(binaryString) {
  // Chuyển chuỗi nhị phân sang số thập phân
  const decimal = parseInt(binaryString, 2);

  return decimal;
}
// console.log(convertToBinary(10));
// console.log(convertToDecimal(convertToBinary(100)));
