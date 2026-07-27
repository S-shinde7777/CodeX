const axios = require('axios');

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71
};

const runCode = async (code, language) => {
  const languageId = LANGUAGE_IDS[language];

  const submissionResponse = await axios.post(
    `${process.env.JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
    {
      source_code: code,
      language_id: languageId
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return submissionResponse.data;
};

module.exports = runCode;