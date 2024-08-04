import React, { useEffect } from "react";
import "./App.css";
import AppLayout from "./components/app/AppLayout";
import { Link } from "react-router-dom";
import { Col, Row, Typography } from "antd";
import heroImage from "./images/hero.jpg";

function App() {
  const navLinks = [
    { key: "patient", label: <Link to="/patient">Patient</Link> },
    { key: "reception", label: <Link to="/reception/patient">Reception</Link> },
    { key: "doctor", label: <Link to="/doctor">Doctor</Link> },
    { key: "login", label: <Link to="/auth/staff/login">Staff Login</Link> },
  ];

  useEffect(() => {
    // (async () => {
    //   // Define the type for medicine data
    //   interface Medicine {
    //     name: string;
    //     quantityInMG: number;
    //     price: string;
    //     units: number;
    //   }
    //   // Base URL for the API
    //   const baseURL: string = "http://yourapiurl.com"; // Replace with your actual API base URL
    //   // List of real medicine names
    //   const medicineNames: string[] = [
    //     "Paracetamol",
    //     "Ibuprofen",
    //     "Aspirin",
    //     "Amoxicillin",
    //     "Cetirizine",
    //     "Metformin",
    //     "Lisinopril",
    //     "Omeprazole",
    //     "Simvastatin",
    //     "Losartan",
    //   ];
    //   // Function to generate dummy medicine data
    //   const generateDummyMedicine = (index: number): Medicine => {
    //     const name: string = medicineNames[index % medicineNames.length]; // Cycle through the medicine names
    //     return {
    //       name: name,
    //       quantityInMG: Math.floor(Math.random() * 1000) + 1, // Random quantity between 1 and 1000 mg
    //       price: (Math.random() * 100).toFixed(2), // Random price between 0 and 100
    //       units: Math.floor(Math.random() * 100) + 1, // Random units between 1 and 100
    //     };
    //   };
    //   // Function to send a POST request
    //   const sendMedicineData = async (
    //     medicineData: Medicine
    //   ): Promise<void> => {
    //     try {
    //       const response = await axios.post(`/medicine`, medicineData);
    //       console.log("Medicine entry created:", response.data);
    //     } catch (error) {
    //       console.error(
    //         "Error creating medicine entry:",
    //         (error as Error).message
    //       );
    //     }
    //   };
    //   // Loop to create and send 10 dummy medicine entries
    //   for (let i = 0; i < 10; i++) {
    //     const dummyMedicine: Medicine = generateDummyMedicine(i);
    //     sendMedicineData(dummyMedicine);
    //   }
    // })();
  });

  return (
    <AppLayout navItems={navLinks}>
      <Row align="middle" justify="center">
        <Col span={24} md={12}>
          <Typography.Title>HealthEase</Typography.Title>
          <Typography.Paragraph>
            At HealthEase, we believe that managing healthcare should be as
            smooth and efficient as possible. Our state-of-the-art hospital
            management system is designed to simplify and streamline every
            aspect of healthcare administration, ensuring that your hospital
            operates at its best.
          </Typography.Paragraph>
        </Col>
        <Col span={24} md={12}>
          <img
            style={{
              width: "70%",
              margin: "0 auto",
              display: "block",
            }}
            src={heroImage}
            alt="hospital image"
          />
        </Col>
      </Row>
    </AppLayout>
  );
}

export default App;
