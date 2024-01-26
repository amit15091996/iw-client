import { getBlogs } from "../services/BlogService";
import { isAdmin } from "../services/Util";
import { CompanyChart } from "./dashboard-components/CompanyChart";
import MainHead from "./dashboard-components/MainHead";
import NewsTimeline from "./dashboard-components/NewsTimeline";
import ThreeCards from "./dashboard-components/ThreeCards";
import WelcomeUserName from "./dashboard-components/WelcomeUserName";
import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [newsList, setNewsList] = useState([]);
  const [cardTitle, setCardTitle] = useState("");
  const [cardContent, setCardContent] = useState("");
  const [cardImage, setCardImage] = useState(null);

  const fetchNewsData = async () => {
    try {
      const result = await getBlogs("NOT_DELETED", 0, 5);
      setNewsList(result.blogList);

      if (result.blogList.length > 0) {
        const firstBlog = result.blogList[0];
        setCardTitle(firstBlog.blogTitle);
        setCardContent(firstBlog.blogDesc1);

        if (firstBlog.fileDetails && firstBlog.fileDetails.fileData) {
          setCardImage(
            `data:image/${firstBlog.fileDetails.fileType};base64,${firstBlog.fileDetails.fileData}`
          );
        }
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []); // Fetch data on component mount

  return (
    <>
      <WelcomeUserName />
      {isAdmin() && <ThreeCards />}
      {isAdmin() && <CompanyChart />}
      <MainHead />
      <NewsTimeline
        newsList={newsList}
        cardTitle={cardTitle}
        cardContent={cardContent}
        cardImage={cardImage}
      />
    </>
  );
};

export default UserDashboard;
