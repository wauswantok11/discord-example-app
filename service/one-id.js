import fetch from 'node-fetch';

const ApiOneID = {
  async searchAccountByUsername(username) {
    const response = await fetch(`${process.env.URL_ONE}/api/search_account_by_username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID_ONE,
        secret_key: process.env.SECRET_KEY_ONE,
        refcode: process.env.REFCODE_ONE,
        username,
      }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },
  async searchAccountByEmail(email) {
    const response = await fetch(`${process.env.URL_ONE}/api/search_account_by_email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID_ONE,
        secret_key: process.env.SECRET_KEY_ONE,
        refcode: process.env.REFCODE_ONE,
        email,
      }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },
  async searchAccountByIdCard(id_card) {
    const response = await fetch(`${process.env.URL_ONE}/api/search_username_by_id_card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID_ONE,
        secret_key: process.env.SECRET_KEY_ONE,
        refcode: process.env.REFCODE_ONE,
        id_card,
      }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },
  async searchAccountByMobileNo(mobile_no) {
    const response = await fetch(`${process.env.URL_ONE}/api/search_accountid_by_mobile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID_ONE,
        secret_key: process.env.SECRET_KEY_ONE,
        refcode: process.env.REFCODE_ONE,
        mobile_no,
      }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },
  async GetTokenOneID(account_id) {
    const response = await fetch(`${process.env.URL_ONE}/api/search_accountid_by_mobile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID_ONE,
        secret_key: process.env.SECRET_KEY_ONE,
        refcode: process.env.REFCODE_ONE,
        account_id,
      }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },
  async GetAccountIdByUsername(account_id){
    const response = await fetch(`${process.env.URL_ONE}/api/search-username/account-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID_ONE,
        secret_key: process.env.SECRET_KEY_ONE,
        refcode: process.env.REFCODE_ONE,
        account_id,
      }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },
}

export default ApiOneID