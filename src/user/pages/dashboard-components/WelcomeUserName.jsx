import { getLoggedInUser } from "../../services/UserService";

const WelcomeUserName = () => {
  return (
    <div>
      <h3 style={{ color: "#003E70" }}>
        {" "}
        Hi, Welcome {getLoggedInUser()?.name} 👋
      </h3>
    </div>
  );
};

export default WelcomeUserName;
