import { useEffect, useRef, useState } from "react";

const OTPInput = () => {
  const [inputArr, setInputArr] = useState(new Array(5).fill(""));
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);
  const handleOnChange = (value, index) => {
    if (isNaN(value)) {
      return;
    }

    const trimmedVal = value.trim();
    const newArr = [...inputArr];
    newArr[index] = trimmedVal.slice(-1); //get the last entered number from the current input box
    setInputArr(newArr);

    inputRef.current[index + 1]?.focus();
  };
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newArr = [...inputArr];
      newArr[index] = "";
      setInputArr(newArr); //empty the current focus input so that previous focus will not be impacted

      if (index > 0) {
        setTimeout(() => {
          inputRef.current[index - 1]?.focus();
        }, 0);
      }
    }
  };
  return (
    <div className="otp-input-container">
      <h1>OTP Input</h1>
      <section className="otp-input-holder">
        {inputArr.map((item, index) => (
          <input
            key={index}
            value={item}
            ref={(ele) => (inputRef.current[index] = ele)}
            onChange={(e) => handleOnChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
          ></input>
        ))}
      </section>
    </div>
  );
};

export default OTPInput;
