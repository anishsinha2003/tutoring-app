"use client"
import { useRouter } from 'next/navigation';
import { useUser } from "@auth0/nextjs-auth0";
import styles from "@/styles/profilePage.module.css";
import stylesSmaller from "@/styles/profilePageSmaller.module.css";
import { CircularProgress } from '@mui/material';
import db from '@/lib/firestore';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import Background from '@/components/Background';
import Image from "next/image";
import SaveIcon from '@mui/icons-material/Save';
import { useSnackbar } from '@/contexts/SnackbarContext';


export default function Profile() {
  // window wdith for different styles
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const [showNameInTitle, setShowNameInTitle] = useState();

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // console.log(previousPage)
  // snackbar for alert message
  const { showMessage } = useSnackbar();

  // const [pageLoading, setPageLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [invalidFields, setInvalidFields] = useState({ })

  // isloadinf here is needed because it takes time to retrieve the user data and
  // you wouldnt want anything to happen while it is loading
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (!isLoading && !user) {
    router.push('/');
  }

  useEffect(() => {
    if (!user) {
      setFormLoading(true)
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

  // clear the fields button action function
  function clearFields() {
    setFields(prevFields => ({
      ...prevFields,
      lastName: "",
      firstName: "",
      phoneNumber: ""
      // email stays untouched
    }));
  }


  // updating user details once the user has clicked the update button (error checks still need to be done)
  const updateUser = async (event: any) => {
    let tempInvalidFields: { [key: string]: string } = {};
    console.log(fields.firstName)
    if (fields.firstName === "") {
      console.log("pajspidhn")
      tempInvalidFields.firstName = "required";
    }
    if (fields.lastName === "") {
      tempInvalidFields.lastName = "required";
    }
    if (fields.phoneNumber !== "" && !/^04\d{8}$/.test(fields.phoneNumber)) {
      tempInvalidFields.phoneNumber = "invalid";
    }

    if (Object.keys(tempInvalidFields).length > 0) {
      setInvalidFields(tempInvalidFields);
      showMessage("Error Occured when Updating", "error")
      return;
    }
    setFormLoading(true)

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
      setInvalidFields({})
      showMessage("Successfully Updated Profile", "success")
      setFormLoading(false)
    }
    // update the current fields with the changed data so the frontend displays the change
    setUserDetails()
  }

  // helper function which sets the new userdetails from firestore
  const setUserDetails = async () => {

    if (!user?.email) return;
    setFormLoading(true)
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
        setShowNameInTitle(userSnap.data().firstName)
      }

      setFormLoading(false)
    } catch (error) {
      console.error("Error checking/adding user:", error);
    }
  };

  return (
    <>
      <Background/>
      {windowWidth < 1020 && windowWidth !== 0
      ?
       <div
        className={stylesSmaller.centerOverlay}
      >
        <div className={stylesSmaller.topBar}>
          Your Profile
        </div>
        <div className={stylesSmaller.contentContainer}>
          <div className={stylesSmaller.profilePicRow}>
            {user
            ? <Image
              src={user.picture!}
              alt="User profile picture"
              width={160}
              height={160}
              className={stylesSmaller.profileImage}
            />
            : <></>
            }
          </div>
          <div className={stylesSmaller.textFieldRow}>
            <div className={stylesSmaller.container}>
              <label htmlFor="firstName" className={stylesSmaller.label} style={{color: "firstName" in invalidFields ? "rgb(255, 177, 177)" : ""}}>
                First Name *
              </label>
              <div className={stylesSmaller.inputWrapper}>
                <input
                  onChange={handleTextFieldChange}
                  value={fields.firstName}
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={stylesSmaller.input}
                  style={{boxShadow: "firstName" in invalidFields ? "inset 0 0 0 2px rgb(255, 177, 177)" : ""}}
                />
              </div>
              <label htmlFor="firstName" className={stylesSmaller.label} style={{color: "firstName" in invalidFields ? "#fa605f" : "", fontSize: 13, fontStyle: "italic"}}>
                <span style={{visibility: "firstName" in invalidFields ? "visible": "hidden", opacity: 0.7 }}>This field is required</span>
              </label>

            </div>
            <div className={stylesSmaller.container}>
              <label htmlFor="lastName"  className={stylesSmaller.label} style={{color: "lastName" in invalidFields ? "rgb(255, 177, 177)" : ""}}>
                Last Name *
              </label>
              <div className={stylesSmaller.inputWrapper}>
                <input
                  onChange={handleTextFieldChange}
                  value={fields.lastName}
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={stylesSmaller.input}
                  style={{boxShadow: "lastName" in invalidFields ? "inset 0 0 0 2px rgb(255, 177, 177)" : ""}}
                />
              </div>
              <label htmlFor="lastName" className={stylesSmaller.label} style={{color: "lastName" in invalidFields ? "#fa605f" : "", fontSize: 13, fontStyle: "italic"}}>
                <span style={{visibility: "lastName" in invalidFields ? "visible": "hidden", opacity: 0.7 }}>This field is required</span>
              </label>
            </div>
            <div className={stylesSmaller.container} style={{opacity: 0.7, pointerEvents: "none"}}>
              <label htmlFor="email" className={stylesSmaller.label}>
                Email
              </label>
              <div className={stylesSmaller.inputWrapper}>
                <input
                  onChange={handleTextFieldChange}
                  value={fields.email}
                  type="text"
                  name="email"
                  id="email"
                  className={stylesSmaller.input}
                  style={{opacity: 0.7}}
                />
              </div>
              <label htmlFor="firstName" className={stylesSmaller.label} style={{color: "firstName" in invalidFields ? "#fa605f" : "", fontSize: 13, fontStyle: "italic"}}>
                <span style={{visibility: "hidden" }}>This field is required</span>
              </label>
            </div>
            <div className={stylesSmaller.container}>
              <label htmlFor="phoneNumber" className={stylesSmaller.label} style={{color: "phoneNumber" in invalidFields ? "rgb(255, 177, 177)" : ""}}>
                Phone Number (optional)
              </label>
              <div className={stylesSmaller.inputWrapper}>
                <input
                  onChange={handleTextFieldChange}
                  value={fields.phoneNumber}
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className={stylesSmaller.input}
                  style={{boxShadow: "phoneNumber" in invalidFields ? "inset 0 0 0 2px rgb(255, 177, 177)" : ""}}
                />
              </div>
              <label htmlFor="firstName" className={stylesSmaller.label} style={{color: "phoneNumber" in invalidFields ? "#fa605f" : "", fontSize: 13, fontStyle: "italic"}}>
                <span style={{visibility: "phoneNumber" in invalidFields ? "visible": "hidden", opacity: 0.7 }}>Phone Number must be in the form 04xxxxxxxx</span>
              </label>
            </div>
          </div>
          <div className={stylesSmaller.actionsRow}>
            <div className={stylesSmaller.actionsRowContainer}>
              <div className={stylesSmaller.saveButton} onClick={updateUser}>
                <div className={stylesSmaller.icon}>
                  <SaveIcon className={stylesSmaller.icon} sx={{ fontSize: 20, position: "relative", top: "-1px", opacity: 0.9 }}/> &nbsp;
                </div>
                SAVE
              </div>
            </div>
          </div>

        </div>
      </div>
      :
       <div
        className={styles.centerOverlay}
      >
        <div className={styles.topContainer}>
          <div  className={styles.leftContainer}>
            <div className={styles.profileImageContainer}>
              {user
                ? <Image
                  src={user.picture!}
                  alt="User profile picture"
                  width={140}
                  height={140}
                  className={styles.profileImage}
                  priority
                />
                : <></>
              }
            </div>
             <div className={styles.description}>
              <div className={styles.description1}>
                Hey <span style={{color: "#0aceb7", fontWeight: "bold" }}>{showNameInTitle}</span>, welcome to your profile!
              </div>
              <div className={styles.description2}>
                The Profile Page allows users to view, edit, and save their name and phone number, making it easy to keep personal information up to date.
              </div>
            </div>
            <div className={styles.fillerImage}>
              <Image
                src="/fillerImage.png"
                alt="User profile picture"
                width={360}
                height={360}
                priority
                className={styles.fillerImageConf}
              />
            </div>
          </div>
          {formLoading
          ?
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <CircularProgress sx={{color: "#009081"}}/>
            </div>
          :
            <div className={styles.rightContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.titleContainer2}>
                <div className={styles.title}>
                  Fill out your details please
                </div>
              </div>
            </div>
            <div className={styles.textFieldRow}>
              <div className={styles.container}>
                <label htmlFor="firstName" className={styles.label} style={{color: "firstName" in invalidFields ? "rgb(255, 177, 177)" : ""}}>
                  First Name *
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    onChange={handleTextFieldChange}
                    value={fields.firstName}
                    type="text"
                    name="firstName"
                    id="firstName"
                    className={styles.input}
                    style={{boxShadow: "firstName" in invalidFields ? "inset 0 0 0 2px rgb(255, 177, 177)" : ""}}
                  />
                </div>
                <label htmlFor="firstName" className={styles.label} style={{color: "firstName" in invalidFields ? "#fa605f" : "", fontSize: 13, fontStyle: "italic"}}>
                  <span style={{visibility: "firstName" in invalidFields ? "visible": "hidden", opacity: 0.7 }}>This field is required</span>
                </label>

              </div>
              <div className={styles.container}>
                <label htmlFor="lastName"  className={styles.label} style={{color: "lastName" in invalidFields ? "rgb(255, 177, 177)" : ""}}>
                  Last Name *
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    onChange={handleTextFieldChange}
                    value={fields.lastName}
                    type="text"
                    name="lastName"
                    id="lastName"
                    className={styles.input}
                    style={{boxShadow: "lastName" in invalidFields ? "inset 0 0 0 2px rgb(255, 177, 177)" : ""}}
                  />
                </div>
                <label htmlFor="lastName" className={styles.label} style={{color: "lastName" in invalidFields ? "#fa605f" : "", fontSize: 13, fontStyle: "italic"}}>
                  <span style={{visibility: "lastName" in invalidFields ? "visible": "hidden", opacity: 0.7 }}>This field is required</span>
                </label>
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
                <label htmlFor="firstName" className={styles.label} style={{color: "firstName" in invalidFields ? "#fa605f" : "", fontSize: 13, fontStyle: "italic"}}>
                  <span style={{visibility: "hidden" }}>This field is required</span>
                </label>
              </div>
              <div className={styles.container}>
                <label htmlFor="phoneNumber" className={styles.label} style={{color: "phoneNumber" in invalidFields ? "rgb(255, 177, 177)" : ""}}>
                  Phone Number (optional)
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    onChange={handleTextFieldChange}
                    value={fields.phoneNumber}
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    className={styles.input}
                    style={{boxShadow: "phoneNumber" in invalidFields ? "inset 0 0 0 2px rgb(255, 177, 177)" : ""}}
                  />
                </div>
                <label htmlFor="firstName" className={styles.label} style={{color: "phoneNumber" in invalidFields ? "#fa605f" : "", fontSize: 13, fontStyle: "italic"}}>
                  <span style={{visibility: "phoneNumber" in invalidFields ? "visible": "hidden", opacity: 0.7 }}>Phone Number must be in the form 04xxxxxxxx</span>
                </label>
              </div>
            </div>
            <div className={styles.actionsRow}>
              <div className={styles.actionsRowContainer}>
                <div className={styles.saveButton} onClick={updateUser}>
                  <div className={styles.icon}>
                    <SaveIcon className={styles.icon} sx={{ fontSize: 20, position: "relative", top: "-1px", opacity: 0.9 }}/> &nbsp;
                  </div>
                  SAVE
                </div>
              </div>
            </div>
            </div>
          }
        </div>
      </div>

      }
    </>
  )
}



