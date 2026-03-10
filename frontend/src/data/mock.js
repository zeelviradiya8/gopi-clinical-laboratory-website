// Mock data for Gopi Clinical Laboratory

export const healthPackages = [
  {
    id: 1,
    name: "Basic Health Checkup",
    description: "Essential tests for overall health monitoring",
    tests: ["Complete Blood Count (CBC)", "Blood Sugar (Fasting)", "Lipid Profile", "Kidney Function Test", "Liver Function Test"],
    price: 1299,
    duration: "6-8 hours",
    ideal_for: "Adults (18-45 years)"
  },
  {
    id: 2,
    name: "Senior Citizen Package",
    description: "Comprehensive health screening for elderly",
    tests: ["Complete Blood Count", "HbA1c", "Lipid Profile", "Kidney & Liver Function", "Thyroid Profile", "Vitamin D", "Vitamin B12", "ECG"],
    price: 2499,
    duration: "8-12 hours",
    ideal_for: "Adults above 60 years"
  },
  {
    id: 3,
    name: "Pre-Employment Package",
    description: "Standard medical tests for job requirements",
    tests: ["CBC", "Blood Group", "HIV Test", "HBsAg", "Chest X-Ray", "Urine Routine"],
    price: 899,
    duration: "4-6 hours",
    ideal_for: "Job applicants"
  },
  {
    id: 4,
    name: "Diabetes Care Package",
    description: "Specialized tests for diabetes monitoring",
    tests: ["HbA1c", "Fasting Blood Sugar", "Post Prandial Blood Sugar", "Kidney Function Test", "Lipid Profile", "Urine Microalbumin"],
    price: 1599,
    duration: "6-8 hours",
    ideal_for: "Diabetic patients"
  },
  {
    id: 5,
    name: "Women's Wellness Package",
    description: "Complete health screening for women",
    tests: ["CBC", "Thyroid Profile", "Vitamin D", "Vitamin B12", "Iron Studies", "Hormone Panel", "Pap Smear"],
    price: 2199,
    duration: "8-10 hours",
    ideal_for: "Women (25-55 years)"
  },
  {
    id: 6,
    name: "Executive Health Package",
    description: "Comprehensive checkup for busy professionals",
    tests: ["Complete Blood Count", "Lipid Profile", "Liver & Kidney Function", "Thyroid Profile", "HbA1c", "Vitamin D", "ECG", "Chest X-Ray", "Stress Test"],
    price: 3499,
    duration: "12-24 hours",
    ideal_for: "Working professionals"
  }
];

export const services = [
  {
    id: 1,
    category: "Biochemistry",
    description: "Comprehensive biochemical analysis for metabolic health",
    tests: [
      "Blood Sugar (HbA1c)",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT/RFT)",
      "Lipid Profile",
      "Electrolytes"
    ]
  },
  {
    id: 2,
    category: "Haematology",
    description: "Blood disorder screening and analysis",
    tests: [
      "Complete Blood Count (CBC)",
      "ESR",
      "Blood Disorder Screening",
      "Anemia Detection",
      "Platelet Count"
    ]
  },
  {
    id: 3,
    category: "Microbiology & Serology",
    description: "Detection of infections and diseases",
    tests: [
      "Malaria",
      "Dengue",
      "Typhoid",
      "Tuberculosis",
      "HIV Testing"
    ]
  },
  {
    id: 4,
    category: "Clinical Pathology",
    description: "Routine pathology examinations",
    tests: [
      "Urine Examination",
      "Stool Examination",
      "Body Fluid Analysis",
      "Semen Analysis"
    ]
  }
];

export const valueAddedServices = [
  {
    id: 1,
    title: "Home Sample Collection",
    description: "Get your blood or urine samples collected from the comfort of your home.",
    available: true
  },
  {
    id: 2,
    title: "Preventive Health Packages",
    description: "Comprehensive health packages designed for different age groups and medical needs.",
    available: true
  },
  {
    id: 3,
    title: "Smart Reports",
    description: "Digital reports with graphical analysis and historical trend comparison.",
    available: true
  },
  {
    id: 4,
    title: "Corporate Wellness",
    description: "Health check-ups and pre-employment medical screening for companies.",
    available: true
  }
];

export const statistics = [
  { label: "Tests Conducted", value: "10,000+" },
  { label: "Patients Served", value: "5,000+" },
  { label: "Accurate Results", value: "98%" },
  { label: "Report Delivery", value: "24 Hours" }
];

export const features = [
  { title: "Fast Reporting", description: "Quick turnaround time for all test results" },
  { title: "Accurate Diagnostics", description: "State-of-the-art equipment for precise results" },
  { title: "Certified Technicians", description: "Experienced and qualified laboratory professionals" },
  { title: "Modern Equipment", description: "Latest technology for reliable testing" }
];

// Mock API responses
export const mockBookTest = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Test booking submitted successfully! We will contact you shortly.",
        booking_id: `BK${Date.now()}`
      });
    }, 800);
  });
};

export const mockContactSubmit = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Thank you for contacting us! We will get back to you soon."
      });
    }, 800);
  });
};
