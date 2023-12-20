import { CompanyChart } from "./dashboard-components/CompanyChart"
import NewsTimeline from "./dashboard-components/NewsTimeline"
import ThreeCards from "./dashboard-components/ThreeCards"
import WelcomeUserName from "./dashboard-components/WelcomeUserName"

const UserDashboard = () => {
  return (
    <>
      <WelcomeUserName />
      <ThreeCards />
      <CompanyChart />
      <NewsTimeline />
    </>
  )
}

export default UserDashboard