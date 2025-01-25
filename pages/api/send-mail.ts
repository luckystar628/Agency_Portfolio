// pages/api/email-send.ts  
import type { NextApiRequest, NextApiResponse } from 'next';  
import { google } from 'googleapis';  
import { promises as fs } from 'fs';  
import path from 'path';  

const TOKEN_PATH = path.join(process.cwd(), 'lib', 'token.json');  
const CREDENTIALS_PATH = path.join(process.cwd(), 'lib', 'creds.json');  

async function loadSavedCredentialsIfExist() {  
    try {  
        const content = await fs.readFile(TOKEN_PATH);
        const tokens = JSON.parse(content.toString());   
        const credentials = await fs.readFile(CREDENTIALS_PATH);  
        // const credentials = JSON.parse(content.toString());  
        const keys = JSON.parse(credentials.toString()); 
        const { client_secret, client_id, redirect_uris } = keys?.web;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        oAuth2Client.setCredentials(tokens);
        return oAuth2Client;  
    } catch (err) {  
        return null;  
    }  
}  

async function sendEmail(auth: any, to: string, subject: string, body: string) {  
    const gmail = google.gmail({ version: 'v1', auth });  
    const email = [  
        `To: ${to}`,  
        `Subject: ${subject}`,  
        '',  
        body,  
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
        const { to, subject, body } = req.body;  
        try {  
            const auth = await loadSavedCredentialsIfExist();  
            if (!auth) {  
                return res.status(401).json({ error: 'Authorization required' });  
            }  
            await sendEmail(auth, to, subject, body);  
            res.status(200).json({ message: 'Email sent successfully' });  
        } catch (error) {  
            console.error('Error sending email:', error);  
            res.status(500).json({ error: 'Failed to send email' });  
        }  
    } else {  
        res.setHeader('Allow', ['POST']);  
        res.status(405).end(`Method ${req.method} Not Allowed`);  
    }  
}