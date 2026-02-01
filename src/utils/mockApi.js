/**
 * Mock API service for the Valentine Experience
 * Simulates network delays and backend responses
 */

export const mockApi = {
    /**
     * Send a notification (e.g., choice made, message sent)
     * @param {string} type - 'CHOICE' | 'MESSAGE'
     * @param {any} data - payload
     */
    sendNotification: async (type, data) => {
        console.log(`[API] Notification Sent:`, { type, data, timestamp: new Date().toISOString() });

        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 500); // 500ms delay
        });
    },

    /**
     * Submit a love letter/message
     * @param {string} message 
     */
    submitMessage: async (message) => {
        console.log(`[API] Message Submitted: "${message}"`);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, id: Math.random().toString(36).substr(2, 9) });
            }, 800); // 800ms delay
        });
    },

    /**
     * Generate and download the response text file
     * @param {string} choice - 'yes' | 'no'
     * @param {string} message - User's message
     */
    downloadResponse: (choice, message) => {
        const date = new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        const content = `My Dearest,\n\nI have received your vows with a heart full of emotion.\n\nMy Answer: ${choice === 'yes' ? 'Yes, Always.' : 'Not just yet...'}\n\n"${message}"\n\nYours,\n${date}`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'My_Answer_To_You.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};
