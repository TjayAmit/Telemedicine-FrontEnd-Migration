export const UserInfo = [
  {
    firstname: "William",
    middleInitial: "M.",
    lastname: "Carpio",
    userStatus: 1,
    caseId: "10022022-10943",
  },
];

export const AddInfo = [
  {
    grid: "1",
    type: "Contact",
    value: "09557653775",
    patients_Contact: null,
  },
  {
    grid: "1",
    type: "Sex",
    value: "Male",
    patients_Gender: null,
  },
  {
    grid: "1",
    type: "Civil Status",
    value: "Single",
    patients_CivilStatus: null,
  },
  {
    grid: "1",
    type: "Birthday",
    value: " Sep 17, 1993 (29 yrs old)",
    patients_Birthday: null,
  },
  {
    grid: "1",
    type: "Religion",
    value: "Roman Chatolic",
    patients_Religion: null,
  },

  {
    grid: "1",
    type: "Address",
    value: "Camino Nuevo , Zamboanga",
  },
  {
    grid: "2",
    type: "Birth Place",
    value: "Zamboanga",
    patients_BirthPlace: null,
  },
  {
    grid: "2",
    type: "Ethnicity",
    value: "Zamboangueno",
    patients_Ethnicity: null,
  },
  {
    grid: "2",
    type: "Dialect",
    value: "Chavacano",
    patients_Dialect: null,
  },
  {
    grid: "2",
    type: "Guardian",
    value: "Leanie Morondo",
  },
  {
    grid: "2",
    type: "Relation",
    value: "Sister",
  },
];
/* grid:Custom

    1:1  = unbox , 2:1 = unbox  */
export const MainInfo = [
  {
    grid: 1,
    type: "Chief Complaint",
    content: "Headache",
    custom: 0,
    cases_CC: null,
  },
  {
    grid: 1,
    type: "Pertinent History of Present Illness",
    content:
      "Patient hx admitted diagnosed last April 12, 2018 with Community Acquired Pneumonia Moderate Risk resolved; Pulmonary Mass probrably malignant-ruled/out gastrointestinal metastasis; ptb 5 Xpert MTB/RF conducted last Sept. 07, 2022 [see attachment result below]",
    custom: 0,
    cases_HPI: null,
  },
  {
    grid: 1,
    type: "Pertinent Past Medical History",
    content: "None",
    custom: 0,
    cases_PMH: null,
  },
  {
    grid: 1,
    type: "Pertinent PE Findings",
    content: "None",
    custom: 0,
    cases_PE: null,
  },
  {
    grid: 1,
    type: "Working Impression",
    content: "None",
    custom: 0,
    cases_WI: null,
  },
  {
    grid: 1,
    type: "Initial Management Done",
    content: "Given medicine for pain. Ibuprofen.",
    custom: 0,
    cases_IMD: null,
  },
  {
    grid: 1,
    type: "Reason for Referral",
    content: "For teleconsultation. Prolong headache for about 5 months.",
    custom: 0,
    cases_Reason: null,
  },
  {
    grid: 1,
    type: "Pertinent Paraclinicals",
    content: "No attached file",
    custom: 1,
  },
  {
    grid: 2,
    type: "Temperature",
    content: "36.6",
    custom: 1,
    cases_Temperature: null,
  },
  {
    grid: 2,
    type: "Respiratory Rate",
    content: "18",
    custom: 1,
    cases_Respiratory: null,
  },
  {
    grid: 2,
    type: "Heart Rate",
    content: "94",
    custom: 1,
    cases_Heart: null,
  },
  {
    grid: 2,
    type: "Blood Pressure",
    content: "110/70",
    custom: 1,
    cases_Blood: null,
  },
  {
    grid: 2,
    type: "Oxygen Saturation",
    content: "97",
    custom: 1,
    cases_Oxygen: null,
  },
  {
    grid: 2,
    type: "Weight",
    content: "60",
    custom: 1,
    cases_Weight: null,
  },
  {
    grid: 2,
    type: "Height",
    content: "168",
    custom: 1,
    cases_Height: null,
  },
];

export const Messages = [
  {
    DoctorFirstname: "Kent",
    avatar: "https://bit.ly/dan-abramov",
    date: "10/10/22",
    specialty: "Internal Medicine",
    hospital: "Zamboanga City Medical Center",
    content:
      "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in",
  },
  {
    DoctorFirstname: "Dennis",
    avatar: "https://bit.ly/dan-abramov",
    date: "10/12/22",
    specialty: "Internal Medicine",
    hospital: "City Jail",
    content:
      "   incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in",
  },
];

export const refInfo = [
  {
    type: "Hospital",
    content: "Bureau of Jail Management and Penology",
    hospital_Name: null,
  },
  {
    type: "Attending Pysician",
    content: "Dr. Kent Belarmino",
    doctor_name: null,
  },
  {
    type: "Date & Time of referral",
    content: "Oct 5, 2022 | 2:48 PM",
    created_at: null,
  },
  {
    type: "Date & Time served",
    content: "Oct 5, 2022 | 3:38 PM 11 hr : 10 min",
    updated_at: null,
  },
];

export const followups = [
  {
    title: "Main (Initial)",
    date: "Oct 5, 2022 | 2:48 PM",
  },
  {
    title: "Second",
    date: "Oct 5, 2022 | 2:48 PM",
  },
  {
    title: "Third",
    date: "Oct 5, 2022 | 2:48 PM",
  },
];
