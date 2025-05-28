"use client"
import { useRouter } from 'next/navigation';
import { useUser } from "@auth0/nextjs-auth0";
import styles from "@/styles/mainPage.module.css";
import BackgroundWaveEffect from "@/components/BackgroundWaveEffect";


export default function Profile() {

  // isloadinf here is needed because it takes time to retrieve the user data and
  // you wouldnt want anything to happen while it is loading
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (!isLoading && !user) {
    router.push('/');
  }

  if (!user) {
    return (<>loading</>)
  }

  return (
    <>
      <div
          className={styles.upperHalfContainer}
          style={{ height: "clamp(700px, 75vh, 2600px)", width: "100%" }}
        >
          <div className={styles.topHalfContentsContainer}>
            Profile
          </div>
          <BackgroundWaveEffect/>
        </div>
        <div className={styles.lowerHalfContainer}>

        </div>
    </>
  )
}

