"use client"
import { useRouter } from 'next/navigation';
import { useUser } from "@auth0/nextjs-auth0";
import styles from "@/styles/profilePage.module.css";
import BackgroundWaveEffect from "@/components/BackgroundWaveEffect";
import { CircularProgress, TextField } from '@mui/material';
import db from '@/lib/firestore';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LoadingScreen from '@/components/LoadingScreen';
import Background from '@/components/Background';
import Image from "next/image";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Profile() {

  const [pageLoading, setPageLoading] = useState(true)

  // isloadinf here is needed because it takes time to retrieve the user data and
  // you wouldnt want anything to happen while it is loading
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (!isLoading && !user) {
    router.push('/');
  }

  useEffect(() => {
    if (!user) {
      setPageLoading(true)
    }
    else {
      setUserDetails()
    }

  }, [user])

  // fields to keep track of the input fields
  const [fields, setFields] = useState({
    lastName: "",
    firstName: "",
    phoneNumber: "",
    email: ""
  })

  // everytime the field changes
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // updating user details once the user has clicked the update button (error checks still need to be done)
  const updateUser = async (event: any) => {
    setPageLoading(true)

    // update the firestore data with new data
    event.preventDefault()
      try {
        if (user?.email) {
          const userRef = doc(db, "users", user.email);

          await updateDoc(userRef, {
              firstName: fields.firstName,
              lastName: fields.lastName,
              phoneNumber: fields.phoneNumber,
              lastModified: new Date(),
          });
        }
    } catch(error) {
      console.log("error adding doc", error)
    } finally {
      setPageLoading(false)
    }
    // update the current fields with the changed data so the frontend displays the change
    setUserDetails()
  }

  // helper function which sets the new userdetails from firestore
  const setUserDetails = async () => {

    if (!user?.email) return;
    setPageLoading(true)
    try {
      const userRef = doc(db, "users", user.email);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setFields({
          lastName: userSnap.data().lastName,
          firstName: userSnap.data().firstName,
          phoneNumber: userSnap.data().phoneNumber,
          email: userSnap.data().email

        })
      }
      setPageLoading(false)
    } catch (error) {
      console.error("Error checking/adding user:", error);
    }
  };

  if (pageLoading) {
    return (
      <LoadingScreen/>
    )
  }

  return (
    <>
      <Background/>
      <div
        className={styles.centerOverlay}
      >
        <div className={styles.topBar}>
          Your Profile
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.profilePicRow}>
            {user
            ? <Image
              src={user.picture!}
              alt="User profile picture"
              width={160}
              height={160}
              className={styles.profileImage}
            />
            : <></>
            }
          </div>
          <div className={styles.textFieldRow}>
            <div className={styles.container}>
              <label htmlFor="firstName" className={styles.label}>
                First Name
              </label>
              <div className={styles.inputWrapper}>
                <input
                  onChange={handleTextFieldChange}
                  value={fields.firstName}
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.container}>
              <label htmlFor="lastName" className={styles.label}>
                Last Name
              </label>
              <div className={styles.inputWrapper}>
                <input
                  onChange={handleTextFieldChange}
                  value={fields.lastName}
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.container} style={{opacity: 0.7, pointerEvents: "none"}}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <div className={styles.inputWrapper}>
                <input
                  onChange={handleTextFieldChange}
                  value={fields.email}
                  type="text"
                  name="email"
                  id="email"
                  className={styles.input}
                  style={{opacity: 0.7}}
                />
              </div>
            </div>
            <div className={styles.container}>
              <label htmlFor="phoneNumber" className={styles.label}>
                Phone Number
              </label>
              <div className={styles.inputWrapper}>
                <input
                  onChange={handleTextFieldChange}
                  value={fields.phoneNumber}
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className={styles.input}
                />
              </div>
            </div>
          </div>
          <div className={styles.actionsRow}>
            <div className={styles.actionsRowContainer}>
               <div className={styles.deleteButton}>
                <div className={styles.icon}>
                  <DeleteIcon sx={{ fontSize: 20, position: "relative", top: "-1px", opacity: 0.9 }}/> &nbsp;
                </div>
                DELETE
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className={styles.saveButton}>
                <div className={styles.icon}>
                  <SaveIcon className={styles.icon} sx={{ fontSize: 20, position: "relative", top: "-1px", opacity: 0.9 }}/> &nbsp;
                </div>
                SAVE
              </div>
            </div>
          </div>

        </div>
        {/* <button onClick={updateUser}>Submit</button>
        <TextField
          name="lastName"
          label="Last Name"
          variant="outlined"
          value={fields.lastName}
          onChange={handleTextFieldChange}
        />
        <TextField
          name="firstName"
          label="First Name"
          variant="outlined"
          value={fields.firstName}
          onChange={handleTextFieldChange}
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
          value={fields.phoneNumber}
          onChange={handleTextFieldChange}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          value={fields.email}
          disabled
        />
        <br />
        <Link href="/">Back</Link>
        <button onClick={updateUser}>Submit</button> */}
      </div>
    </>
  )
}

