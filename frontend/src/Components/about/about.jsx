import React from "react";
import Image from "../../assets/image/logimg.jpg"
import "./about.css";
const About = () => {;
  return (
    <>
      <h1 className="headerName" >READING BOOK </h1>
      <div className="hero-container">
        <img
          style={{ width: "400px", height: "500px" }}
          src={Image}
          alt=""
        />
        <section>
          <p
            style={{
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              margin: "5 5 50px",
              fontFamily: 'cursive'
              
            }}
          >
             A growing body of research indicates that
           reading literally changes your mind.
          Using MRI scans, researchers have confirmedTrusted Source
          that reading involves a complex network of circuits and 
          signals in the brain. As your reading ability matures, 
          those networks also get 
          stronger and more sophisticated.
          In one studyTrusted Source conducted in 2013,
          researchers used functional MRI scans to measure
          the effect of reading a novel on the brain.
           Study participants read the novel 
          “Pompeii” over a period of 9 days. As tension built in
           the story, more and more areas of
            the brain lit up with activity.
          Brain scans showed that throughout the reading 
          period and for days afterward, brain connectivity increased,
          especially in the somatosensory cortex, the part of the brain 
          that responds to physical sensations like movement and pain.
            
      
          </p>
        </section>        
      </div>
    </>
  );
};

export default About;