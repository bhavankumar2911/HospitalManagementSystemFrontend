import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    // (async () => {
    //   // Function to generate a dummy patient entry with real data
    //   const generatePatientEntry = (index: number) => {
    //     const genders = [0, 1]; // 0: female, 1: male
    //     const names = [
    //       { firstname: "John", lastname: "Doe" },
    //       { firstname: "Jane", lastname: "Smith" },
    //       { firstname: "Emily", lastname: "Johnson" },
    //       { firstname: "Michael", lastname: "Brown" },
    //       { firstname: "Linda", lastname: "Williams" },
    //       { firstname: "James", lastname: "Miller" },
    //       { firstname: "Olivia", lastname: "Davis" },
    //       { firstname: "Daniel", lastname: "Garcia" },
    //       { firstname: "Sophia", lastname: "Martinez" },
    //       { firstname: "Liam", lastname: "Hernandez" },
    //     ];
    //     const preConditions = [
    //       "Diabetes",
    //       "Hypertension",
    //       "Asthma",
    //       "Chronic Obstructive Pulmonary Disease (COPD)",
    //       "Heart Disease",
    //       "Arthritis",
    //       "Kidney Disease",
    //       "Epilepsy",
    //       "Migraines",
    //       "Thyroid Disorder",
    //     ];
    //     const allergies = [
    //       "Peanuts",
    //       "Shellfish",
    //       "Milk",
    //       "Eggs",
    //       "Soy",
    //       "Wheat",
    //       "Tree Nuts",
    //       "Dust Mites",
    //       "Pollen",
    //       "Penicillin",
    //     ];
    //     // Ensure the blood type index is within the range 0-7
    //     const blood = index % 8;
    //     const name = names[index % names.length];
    //     const preCondition = preConditions[index % preConditions.length];
    //     const allergy = allergies[index % allergies.length];
    //     return {
    //       gender: genders[index % genders.length], // Randomly select gender
    //       blood: blood, // Use index for blood type
    //       firstname: name.firstname,
    //       lastname: name.lastname,
    //       email: `patient${index + 1}@example.com`,
    //       phone: `+1-555-010${index + 1}`, // Phone number with country code
    //       address: `1234 Health Ave, City ${index + 1}, Country`,
    //       dateOfBirth: new Date().toISOString(),
    //       medicalHistory: {
    //         preConditions: preCondition,
    //         allergies: allergy,
    //       },
    //     };
    //   };
    //   // Save 10 dummy patient entries
    //   const savePatients = async () => {
    //     try {
    //       for (let i = 0; i < 10; i++) {
    //         const patientEntry = generatePatientEntry(i);
    //         const response = await axios.post("/patient", patientEntry);
    //         console.log(`Patient ${i + 1} saved successfully:`, response.data);
    //       }
    //     } catch (error) {
    //       console.error("Error saving patients:", error);
    //     }
    //   };
    //   // Call the function to save patients
    //   savePatients();
    // })();
  });
  return <div></div>;
}

export default App;
