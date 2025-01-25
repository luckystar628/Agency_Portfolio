import type { NextApiRequest, NextApiResponse } from 'next';  
import { google } from 'googleapis';  
import { promises as fs } from 'fs';  
import path from 'path';  

const TOKEN_PATH = path.join(process.cwd(), 'lib', 'token.json');  
const CREDENTIALS_PATH = path.join(process.cwd(), 'lib', 'creds.json');  

async function loadSavedCredentialsIfExist() {  
    try {  
        const content = await fs.readFile(TOKEN_PATH);  
        const credentials = JSON.parse(content.toString());  
        return google.auth.fromJSON(credentials);  
    } catch (err) {  
        return null;  
    }  
}  

async function sendEmail(auth: any, emailData: { email: string; subject: string; message: string }) {  
    const gmail = google.gmail({ version: 'v1', auth });  
    const email = [  
        `From: "Your Name" <your-email@gmail.com>`,  
        `To: ${emailData.email}`,  
        `Subject: ${emailData.subject}`,  
        '',  
        emailData.message,  
    ].join('\n');  

    const base64EncodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');  
    await gmail.users.messages.send({  
        userId: 'me',  
        requestBody: {  
            raw: base64EncodedEmail,  
        },  
    });  
}  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
    if (req.method === 'POST') {  
        const emailData = req.body;  
        const auth = await loadSavedCredentialsIfExist();  

        if (!auth) {  
            return res.status(401).json({ error: 'Not authorized' });  
        }  

        try {  
            await sendEmail(auth, emailData);  
            res.status(200).json({ message: 'Email sent successfully!' });  
        } catch (error) {  
            console.error('Error sending email:', error);  
            res.status(500).json({ error: 'Failed to send email' });  
        }  
    } else {  
        res.setHeader('Allow', ['POST']);  
        res.status(405).end(`Method ${req.method} Not Allowed`);  
    }  
}