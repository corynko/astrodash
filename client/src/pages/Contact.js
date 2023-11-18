import AppBarHeightContext from "../contexts/AppBarHeightContext";
import { useContext, useState } from "react";
import FormContactMotion from "../components/contactComponents/contactForm";

export default function Contact() {
  const appBarHeight = useContext(AppBarHeightContext);
  const coverPageStyle = {
    minHeight: `calc(100vh - ${appBarHeight}px - 150px)`,
  };

  return (
    <>
      <div className="contactCoverImg" />
      <div className="flex column center coverPage" style={coverPageStyle}>
        <h1 className="homeHeader m25 p75 stroke25">contact us</h1>
        <h4 className="homeHeader m25 stroke25">
          we will get back to you as soon as possible
        </h4>
        <FormContactMotion />
      </div>
    </>
  );
}
