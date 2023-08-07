import React, {useEffect, useState} from 'react'
import { DB } from '../firebase'
import { Button, Card, Grid, Container, Image } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { collection, deleteDoc, onSnapshot, doc } from 'firebase/firestore'
import ModalComp from '../components/ModalComp'


const Home = () => {
  const [users, setUsers]= useState([]);
  const [user, setUser]= useState({});
  const [open, setOpen]= useState(false);
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();

  useEffect(()=> {
    setLoading(true);
    const unsub = onSnapshot(collection(DB, "users"), (snapshot)=>{
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()})
      });

      setUsers(list);
      setLoading(false); 
    });
    return ()=>{
      unsub();
    }
  }, []);

  const handleModal = (item) => {
    setOpen(true);
    setUser(item);
  }

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete user?")){
      setOpen(false);
      await deleteDoc(doc(DB, "users", id));
      setUsers(users.filter((user)=> user.id !== id));
    }
  }


  return (
    <Container>
        <Grid columns={3} stackable>
          {users && users.map((item)=> (
            <Grid.Column key={item.id}>
              <Card>
                <Card.Content>
                  <Image 
                    src={item.img}
                    size='medium'
                    style={{
                      height: "150px", width: "150px", borderRadius: "50%"
                    }}
                  />
                  <Card.Header style={{marginTop: "10px"}}>{item.name}</Card.Header>                  
                </Card.Content>

                <Card.Content extra>
                  <div>
                    <Button color='green' onClick={()=> navigate(`update/${item.id}`)} >Update</Button>
                    <Button color='purple' onClick={()=> handleModal(item)}>View</Button>
                    {open && (
                      <ModalComp
                        open={open}
                        setOpen={setOpen}
                        handleDelete={handleDelete}
                        {...user}                  
                      />
                    )}
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
    </Container>
  )
}

export default Home