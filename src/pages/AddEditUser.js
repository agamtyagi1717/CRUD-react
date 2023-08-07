import React, {useState, useEffect} from 'react'
import {Button, Form, Grid, Loader} from 'semantic-ui-react'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { storage, DB } from '../firebase'
import { useParams, useNavigate } from 'react-router-dom'
import { updateDoc, addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore'
import './AddEditUser.css'

const initialState ={
  name: "", 
  email: "",
  phone: "",
  dateOfBirth: ""
}

const AddEditUser = () => {

  const [data, setData] = useState(initialState);
  const {name, email, phone, dateOfBirth} = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate =useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    id && getSingleUser();
  }, [id])

  const getSingleUser = async () => {
    const docRef = doc(DB, "users", id);
    const snapshot = await getDoc(docRef);

    if(snapshot.exists()){
      setData({...snapshot.data()});
    }
  }

  useEffect(()=>{
    const uploadFile =()=>{
      const name = new Date().getTime()+file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setProgress(progress);
        switch (snapshot.state){
          case "paused": 
            console.log("upload is paused");
            break;
          
          case "running":
            console.log("upload is running");
            break;

            

          default:
            break;
        }

      }, (error) =>
        {console.log(error)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setData((prev) => ({...prev, img: downloadURL}));
          });
        }
      );
    };

    file && uploadFile()
  }, [file])

  const handleChange = (e)=>{
    setData({...data, [e.target.name]: e.target.value});
  };

  const validate=()=>{
    let errors={};

    if(!name){
      errors.name="Name is required";
    }
    if(!email){
      errors.email="Email is required";
    }
    if(!phone){
      errors.phone="Phone number is required";
    }
    if(!dateOfBirth){
      errors.dateOfBirth="Date of birth is required";
    }

    return errors;

  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    let errors=validate();

    if(Object.keys(errors).length) return setErrors(errors);

    setIsSubmit(true);
     if(!id){
      await addDoc(collection(DB, "users"), {
        ...data,
        timestamp: serverTimestamp()
      });
     }
     else{
      await updateDoc(doc(DB, "users", id), {
        ...data,
        timestamp: serverTimestamp()
      });
     }

    navigate('/');
  }




  return (
    <div>
      <Grid centered verticalAlign='middle' columns={3} style={{height: "80vh"}}>
          <Grid.Row>
            <Grid.Column textAlign='center' >
              <div>
                {isSubmit ? <Loader active inline="centered" size='huge' /> : (
                  <>
                  <h2>{id ? "Update User" : "Add User"}</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Input 
                      label="Name"
                      error={errors.name ? {content: errors.name}:null}
                      placeholder="Enter name" 
                      name="name" 
                      onChange={handleChange} 
                      value={name}
                      autoFocus
                    />
                    <Form.Input 
                      label="Email Address"
                      error={errors.email ? {content: errors.email}:null}
                      placeholder="Enter Email address" 
                      name="email" 
                      onChange={handleChange} 
                      value={email}
                    />
                    <Form.Input 
                      label="Phone number"
                      error={errors.phone ? {content: errors.phone}:null}
                      placeholder="Enter phone number" 
                      name="phone" 
                      onChange={handleChange} 
                      value={phone}
                    />
                    <Form.Input 
                      label="Date of birth"
                      error={errors.dateOfBirth ? {content: errors.dateOfBirth}:null}
                      type='date'
                      placeholder="Enter date of birth" 
                      name="dateOfBirth" 
                      onChange={handleChange} 
                      value={dateOfBirth}
                    />
                    <Form.Input 
                      label="Upload"
                      type='file'
                      onChange={(e) => setFile(e.target.files[0])} 
                    />

                    <Button primary type='submit' disabled={progress !== null && progress<100}>
                      Submit
                    </Button>
                  </Form>
                  </>
                )}
              </div>
            </Grid.Column>
          </Grid.Row>
      </Grid>
    </div>
  )
}

export default AddEditUser