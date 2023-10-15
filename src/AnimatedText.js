import React, { useState, useEffect } from "react";
import st from "./style/style.scss";
const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }
    }, 150); // Интервал задержки между буквами (в миллисекундах)

    return () => {
      clearTimeout(typingTimer);
    };
  }, [currentIndex, text]);

  return (
    <>
      <h1
        className={`title mainTitle ${
          displayText.length === text.length ? "fadeIn" : ""
        }`}
      >
        {displayText}
      </h1>
    </>
  );
};

export default TypingEffect;
