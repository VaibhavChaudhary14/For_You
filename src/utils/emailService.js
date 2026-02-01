import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const emailService = {
    sendLetter: async (data) => {
        try {
            if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
                console.warn('EmailJS keys are missing. Check your .env file.');
                return { success: false, error: 'Configuration missing' };
            }

            // Create a timeout promise that rejects after 10 seconds
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Request timed out')), 10000);
            });

            const emailPromise = emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    to_name: 'My Love', // You can customize this
                    from_name: 'Your Valentine',
                    message: data.message,
                    choice: data.choice === 'yes' ? 'Haa, Humesha (Yes)' : 'Abhi Nahi... (Not Yet)',
                    date: new Date().toLocaleDateString(),
                },
                PUBLIC_KEY
            );

            // Race against the timeout
            const response = await Promise.race([emailPromise, timeoutPromise]);

            return { success: true, status: response.status };
        } catch (error) {
            console.error('Failed to send email:', error);
            return { success: false, error: error };
        }
    }
};
