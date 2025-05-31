"use client";
import styles from "@/styles/mainPage.module.css"
import BackgroundWaveEffect from "./BackgroundWaveEffect";

export default function Background() {

  return (
    <>
      <div
        className={styles.upperHalfContainer}
        style={{ height: "clamp(700px, 75vh, 2600px)", width: "100%" }}
      >
        <div className={styles.topHalfContentsContainer}>
          <div className={styles.topHalfContentsContainer2} style={{display: "flex", justifyContent: "center", alignItems: "center"}}></div>
        </div>
        <BackgroundWaveEffect/>
      </div>
      <div className={styles.lowerHalfContainer}></div>
    </>

  );
}
