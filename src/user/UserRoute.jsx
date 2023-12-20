
import UserNavbar from "./components/UserNavbar"
import { Navigate } from "react-router-dom"
import { isUserLoggedIn } from "./services/UserService"
import { Box } from "@mui/material"
const UserRoute = () => {
  return isUserLoggedIn() ? (
    <Box>
      <UserNavbar />
    </Box>
  ) : <Navigate to='/login' />
}

export default UserRoute