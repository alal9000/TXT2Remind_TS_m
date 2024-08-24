import axios from 'axios';

const sendTwilioMessage = async (
  phone: string,
  message: string,
  sendAt: string
) => {
  //secrets
  const accountSid = '';
  const authToken = '';
  const mss = '';

  try {
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      new URLSearchParams({
        To: phone,
        From: '+15747013726',
        Body: message,
        SendAt: sendAt,
        MessagingServiceSid: mss,
        ScheduleType: 'fixed'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: accountSid,
          password: authToken
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
