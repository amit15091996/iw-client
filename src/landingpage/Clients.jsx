
const Clients = () => {
  const clientList = [
    "⭐ Alok Traders",
    "⭐ Aviral Enterprises",
    "⭐ Bafna Jewellers",
    "⭐ Dhanansh Engineering",
    "⭐ Hira Agro",
    "⭐ K.M Industries",
    "⭐ Mahaveer Jewellers",
    "⭐ Shubham Motor",
    "⭐ Prience Infotech",
    "⭐ BR Enterprises",
    "⭐ JP Tyre",
    "⭐ Mahajan Jewellers",
    "⭐ Pankaj Tiles",
    "⭐ Reet Hosiery",
    "⭐ Kajal Industries",
    "⭐ Warshi AirConditioner",
    "⭐ Vrindavan Electronics",
    "⭐ Shourya Traders",
    "⭐ Kahna Telecom",
    "⭐ Dewangan Enterprises",
    "⭐ Balaji Light House",
    "⭐ Car Care",
    "⭐ D.K. Enterprises",
    "⭐ KK MacineDry",
  ];

  return (
    <div
      className="client-list"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Adjust width as needed
        gap: "20px",
        padding: "20px",
        margin: "0 auto",
        maxWidth: "1000px", // Adjust the maximum width
      }}
    >
      {clientList.map((client, index) => (
        <div
          className="client-item"
          key={index}
          style={{
            textAlign: "right",
            backgroundColor: "#f5f1e3",
            padding: "10px",
            borderRadius: "5px",
            whiteSpace: "nowrap", /* Prevent line breaks */
            textOverflow: "ellipsis", /* Show ellipsis for long names */
            lineHeight: "1.5", /* Set a consistent line height */
            height: "60px", // Fixed height for alignment
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          {client}
        </div>
      ))}
    </div>
  );
};

export default Clients;
