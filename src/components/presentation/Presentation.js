import React from "react";
import { fadeIn } from "react-animations";
import Radium, { StyleRoot } from "radium";
import st from "./Presentation.module.scss";
import arrowImg from "./arrow.svg";

const styles = {
  fadeIn: {
    animation: "x 2s",
    animationName: Radium.keyframes(fadeIn, "fadeIn"),
  },
};

const Presentation = () => {
  return (
    <>
      <StyleRoot>
        <div style={styles.fadeIn} className={st.presentation}></div>
      </StyleRoot>
    </>
  );
};

export default Presentation;
