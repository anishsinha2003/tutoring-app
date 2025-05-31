"use client";
import styles from "@/styles/mainPage.module.css";
import Image from "next/image";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SchoolIcon from "@mui/icons-material/School";
import Link from 'next/link';
import { useUser } from "@auth0/nextjs-auth0";
import BackgroundWaveEffect from "./BackgroundWaveEffect";

export default function HomePage() {

  // user stuff
	const { user, isLoading } = useUser();
	const userLoggedIn = !isLoading && user;


  return (
    <>
        <div
          className={styles.upperHalfContainer}
          style={{ height: "clamp(700px, 75vh, 2600px)", width: "100%" }}
        >
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
          <BackgroundWaveEffect/>
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
    </>
  );
}