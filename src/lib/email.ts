import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_EMAIL = 'info@spanishconveyancing.es';

interface LeadData {
  name: string;
  email: string;
  phone: string;
  agency?: string;
  callbackPreference: 'today' | 'tomorrow' | 'this_week';
}

export async function sendLeadNotification(lead: LeadData) {
  const callbackLabels = {
    today: 'Today',
    tomorrow: 'Tomorrow',
    this_week: 'This Week',
  };

  try {
    const { data, error } = await resend.emails.send({
      from: 'Spanish Conveyancing <noreply@spanishconveyancing.es>',
      to: NOTIFICATION_EMAIL,
      subject: `New Lead: ${lead.name}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        ${lead.agency ? `<p><strong>Agency:</strong> ${lead.agency}</p>` : ''}
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Callback Preference:</strong> ${callbackLabels[lead.callbackPreference]}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Madrid' })}</p>
      `,
    });

    if (error) {
      console.error('Failed to send lead notification:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
