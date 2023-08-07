import React from 'react'
import {Menu, Container, Button, Image} from 'semantic-ui-react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../asset/logo2.png'

const Navbar = () => {
    const navigate = useNavigate();


  return (
    <Menu inverted borderless style={{padding: "0.3rem", marginBottom: "20px"}} attached>
        <Container>
            <Menu.Item name='home'>
                <Link to='/'>
                    <Image size='mini' src={logo}/>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <h2>CRUD Operations</h2>
            </Menu.Item>
            <Menu.Item position='right'>
                <Button size='mini' primary onClick={()=>navigate('/add')}>
                    Add User
                </Button>
                
            </Menu.Item>
        </Container>
    </Menu>
  )
}

export default Navbar