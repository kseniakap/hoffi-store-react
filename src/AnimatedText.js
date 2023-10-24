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
    }, 150);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [currentIndex, text]);

  useEffect(() => {
    if (currentIndex === text.length) {
      const resetTimer = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex(0);
      }, 15000); // Сбросить анимацию через 15 секунд после завершения

      return () => {
        clearTimeout(resetTimer);
      };
    }
  }, [currentIndex, text]);

  return (
    <>
      <h1
        className={` ${
          displayText.length === text.length ? "fadeIn" : ""
        } title  mainTitle  `}
      >
        {displayText}
      </h1>
    </>
  );
};

export default TypingEffect;
