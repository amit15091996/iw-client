import { useState } from 'react'
import { Navbar, Nav } from 'rsuite';
import { useSelector } from 'react-redux'
import { Container } from '@mui/material';
import { FaRegUserCircle } from "react-icons/fa";
import { getLoggedInUserName } from '../services/UserService';

const CustomNavbar = ({ userName,onSelect, activeKey, ...props }) => {
    return (
        <Navbar {...props} style={{backgroundColor:'rgba(9,9,112,0.6)',color:'white'}}>
            <Container>
                <Navbar.Brand href="#">INTALLYSH WISDOM</Navbar.Brand>
                <Nav onSelect={onSelect} activeKey={activeKey}>
                    {/* <Nav.Item eventKey="1" icon={<HomeIcon />}>
          Home
        </Nav.Item>
        <Nav.Item eventKey="2">News</Nav.Item>
        <Nav.Item eventKey="3">Products</Nav.Item>
        <Nav.Menu title="About">
          <Nav.Item eventKey="4">Company</Nav.Item>
          <Nav.Item eventKey="5">Team</Nav.Item>
          <Nav.Item eventKey="6">Contact</Nav.Item>
        </Nav.Menu> */}
                </Nav>
                <Nav pullRight>
                    <Nav.Item icon={<FaRegUserCircle />}>{userName}</Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
};

const UserAppbar = () => {
    const [activeKey, setActiveKey] = useState(null);

    const expandValue = useSelector((state) => state.expandNav.value);
    return (
        <>{console.log(expandValue)}
            <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} userName ={expandValue?getLoggedInUserName():'No'} />
        </>
    );
};


export default UserAppbar