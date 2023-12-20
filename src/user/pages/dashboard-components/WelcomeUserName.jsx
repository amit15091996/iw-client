import { useState, useEffect } from "react";
import { getLoggedInUser } from "../../services/UserService";

const WelcomeUserName = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getLoggedInUser();
        setUsername(user?.name);
        console.log("---", user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 style={{ color: "#003E70" }}> Hi, Welcome {username} 👋</h3>
    </div>
  );
};

export default WelcomeUserName;
