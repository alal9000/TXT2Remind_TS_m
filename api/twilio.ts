import axios from 'axios';

const sendTwilioMessage = async (
  phone: string,
  message: string,
  sendAt: string
) => {
  //secrets
  const ACCOUNTSID = '';
  const AUTHTOKEN = '';
  const MESSAGINGSERVICESID = '';

  try {
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNTSID}/Messages.json`,
      new URLSearchParams({
        To: phone,
        From: '+15747013726',
        Body: message,
        SendAt: sendAt,
        MessagingServiceSid: MESSAGINGSERVICESID,
        ScheduleType: 'fixed'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: ACCOUNTSID,
          password: AUTHTOKEN
        }
      }
    );

    return response;
  } catch (error: any) {
    console.error(
      'Failed to send message:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default sendTwilioMessage;
