import axios from "axios";

// Lazy getter to ensure dotenv has loaded
const getAirtableClient = () => {
  const AIRTABLE_PAT = process.env.AIRTABLE_PAT;

  if (!AIRTABLE_PAT) {
    throw new Error("Airtable PAT is not defined in .env");
  }

  return axios.create({
    baseURL: "https://api.airtable.com/v0/",
    headers: {
      Authorization: `Bearer ${AIRTABLE_PAT}`,
      "Content-Type": "application/json",
    },
  });
};

export const airtableClient = getAirtableClient();
