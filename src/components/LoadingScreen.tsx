"use client";

import { CircularProgress } from "@mui/material";
import styles from "@/styles/mainPage.module.css";
import BackgroundWaveEffect from "./BackgroundWaveEffect";

export default function LoadingScreen() {

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
      <div
        className={styles.centerOverlay}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 4000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          borderRadius: '10px',

        }}
      >
        <CircularProgress sx={{ color: 'white' }} />
      </div>
    </>

  );
}
