import fetch from 'node-fetch';

// Helper function to get credentials by zone
let URL_ONE = ""
function getCredentials(zone) {
  const zoneSuffix = zone === "uat" ? "_UAT" : "_PRD";
  if (zone === "uat") {
    URL_ONE = process.env.URL_ONE_UAT;
  } else {
    URL_ONE = process.env.URL_ONE_PRD;
  }
  return {
    "client_id": process.env[`CLIENT_ID_ONE${zoneSuffix}`],
    "secret_key": process.env[`SECRET_KEY_ONE${zoneSuffix}`],
    "refcode": process.env[`REFCODE_ONE${zoneSuffix}`],
    "ref_code": process.env[`REFCODE_ONE${zoneSuffix}`],
    "client_secret": process.env[`SECRET_KEY_ONE${zoneSuffix}`],

  };
}

async function makeApiCall(endpoint, body, method) {
  console.log('endpoint', endpoint)
  console.log('body', body)
  console.log('URL_ONE', URL_ONE)

  if (!method) {
    method = 'POST';
  }
  console.log('method', method)
  const response = await fetch(`${URL_ONE}${endpoint}`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : null
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

const ApiOneID = {
  async getIalUser(zone, account_id) {
    const credentials = getCredentials(zone);

    return makeApiCall(`/api/loa_level/${account_id}`, null, 'GET');
  },

  async searchAccountByUsername(zone, username) {
    const credentials = getCredentials(zone);
    return makeApiCall('/api/search_account_by_username', {
      ...credentials,
      username
    });
  },

  async searchAccountByEmail(zone, email) {
    const credentials = getCredentials(zone);
    return makeApiCall('/api/search_account_by_email', {
      ...credentials,
      email
    });
  },

  async searchAccountByIdCard(zone, id_card) {
    const credentials = getCredentials(zone);

    return makeApiCall('/api/search_username_by_id_card', {
      ...credentials,
      id_card
    });
  },

  async searchAccountByMobileNo(zone, mobile_no) {
    const credentials = getCredentials(zone);
    return makeApiCall('/api/search_accountid_by_mobile', {
      ...credentials,
      mobile_no
    });
  },

  async GetTokenOneID(zone, account_id) {
    const credentials = getCredentials(zone);

    return makeApiCall('/api/oauth/account/id', {
      ...credentials,
      account_id
    });
  },

  async GetAccountIdByUsername(zone, account_id) {
    const credentials = getCredentials(zone);
    return makeApiCall('/api/search-username/account-id', {
      ...credentials,
      account_id
    });
  },
}

export default ApiOneID