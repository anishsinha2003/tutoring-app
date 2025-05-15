"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/mainPage.module.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SchoolIcon from "@mui/icons-material/School";
import db from "@/lib/firestore";
import Link from 'next/link';
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { useUser } from "@auth0/nextjs-auth0";

export default function HomePage() {
  //   // adding new user
  //   const addNewUser = async (event: any) => {
  //     event.preventDefault()
  //     console.log(session)
  //     try {
  //         const doctRef = await setDoc(doc(db, "users", session.user.email), {
  //             name: session.user.name,
  //             email: session.user.email,
  //             createdAt: new Date()
  //         });
  //     } catch(error) {
  //         console.log("error adding doc", error)
  //     }
  //   }

  //   // updating user details
  //   const updateUser = async (event: any) => {
  //     event.preventDefault()
  //      try {
  //         const userRef = doc(db, "users", session.user.email);

  //         await updateDoc(userRef, {
  //             name: "ANSIHSINAh new"
  //         });
  //     } catch(error) {
  //         console.log("error adding doc", error)

  //     }
  //   }
	const { user, isLoading } = useUser();
	const userLoggedIn = !isLoading && user;

  return (
    <div>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.dottedBg} />
        <div
          style={{
            overflow: "hidden",
            background: "linear-gradient(#008476, #d9d9d9)",
            opacity: 0.1,
            width: 200,
            height: "calc(100%)",
            position: "absolute",
            transform: "rotate(20deg)",
            zIndex: 1,
          }}
        />

        <div className={styles.banner}>
          <div className={styles.bannerText1}>Free Trial Lesson</div>
          <div className={styles.bannerText2}>Limited Time Offer!</div>
        </div>

        <div
          className={styles.upperHalfContainer}
          style={{ height: "clamp(700px, 75vh, 2600px)", width: "100%" }}
        >
          <div>
            <AppBar
              position="absolute"
              sx={{ backgroundColor: "transparent", boxShadow: "none" }}
            >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                ></IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                ></Typography>
                {!userLoggedIn ? (
                  <div className={styles.loginButton}>
                    <a href="/auth/login">Login</a>
                  </div>
                ) : (
                  <>
                    <h1>Welcome, {user.name}!</h1>
                    <a href="/auth/logout">Log out</a>
                  </>
                )}
              </Toolbar>
            </AppBar>
          </div>
          <div className={styles.topHalfContentsContainer}>
            <div className={styles.topHalfContentsContainer2}>
              <div className={styles.leftSection}>
                <div className={styles.leftSectionTitle}>
                  <span
                    style={{ color: "#303030", fontWeight: 600, opacity: 0.8 }}
                  >
                    LENORAH
                  </span>{" "}
                  <span style={{ color: "white", opacity: 0.8 }}>Learning</span>
                </div>
                <div className={styles.leftSectionDescription}>
                  Igniting the light within every mind. Helping every student
                  shine, one session at a time—offering online and in-person
                  tutoring in HSC Maths, Economics, Biology, and more.
                </div>
                <div className={styles.leftSectionButtonsContainer}>
                  <div className={styles.button1}>ENQUIRE</div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									{!userLoggedIn
										?  <div className={styles.button2}><a href="/auth/login?returnTo=/book-class">BOOK CLASS</a></div>
										: 	<Link href="/book-class"><div className={styles.button2}>BOOK CLASS</div></Link>
									}
                </div>
              </div>
              <div className={styles.rightSection}>
                <Image
                  src="/tutor.png"
                  alt="A description of the image"
                  width={500}
                  className={styles.image}
                  height={300}
                />
              </div>
            </div>
          </div>
          <div>
            <svg
              className="absolute bottom-0 w-full"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <defs>
                <filter
                  id="dropShadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="0"
                    dy="-4"
                    stdDeviation="8"
                    floodColor="rgba(0, 0, 0, 0.09)"
                  />
                </filter>
              </defs>

              <path
                fill="#D9D9D9"
                d="M0,200 C480,40 960,280 1440,200 L1440,420 L0,390 Z"
                filter="url(#dropShadow)"
              />
            </svg>
          </div>
        </div>
        <div className={styles.lowerHalfContainer}>
          <div className={styles.box}>
            <div className={styles.boxIcon}>
              <CastForEducationIcon sx={{ fontSize: 30, color: "#00a493" }} />
            </div>
            <div className={styles.boxTitle}>Flexible Learning Options</div>
            <div className={styles.boxDescription}>
              Attend classes online or in person to suit your schedule
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.boxIcon}>
              <ImportContactsIcon sx={{ fontSize: 30, color: "#00a493" }} />
            </div>
            <div className={styles.boxTitle}>Wide Range of HSC Subjects</div>
            <div className={styles.boxDescription}>
              Covering everything from Maths, English, Economics and more
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.boxIcon}>
              <TipsAndUpdatesIcon sx={{ fontSize: 30, color: "#00a493" }} />
            </div>
            <div className={styles.boxTitle}>Personalised Study Support</div>
            <div className={styles.boxDescription}>
              Tailored feedback, and exam strategies to boost your marks
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.boxIcon}>
              <SchoolIcon sx={{ fontSize: 30, color: "#00a493" }} />
            </div>
            <div className={styles.boxTitle}>
              Dedicated & Experienced Tutors
            </div>
            <div className={styles.boxDescription}>
              Learn from top achievers who have succeeded in HSC
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// "user" : {
//   startDate: Date,
//   recurringDay: String (Monday to Sunday)
//   subjects: {
//     Maths:
//   }

// }

{
  /* <div className={styles.button2} onClick={addNewUser}>
Add data idk
</div> */
}
