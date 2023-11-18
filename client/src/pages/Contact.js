import FormContactMotion from "../components/contactComponents/contactForm";

export default function Contact() {
  return (
    <>
      <div className="contactCoverImg" />
      <div className="flex column center coverPage">
        <h1 className="homeHeader m25 p75 stroke25">contact us</h1>
        <h4 className="homeHeader m25 stroke25">
          we will get back to you as soon as possible
        </h4>
        <FormContactMotion />
      </div>
    </>
  );
}
