// pages/api/auth-gmail.ts  
import type { NextApiRequest, NextApiResponse } from 'next';  
import { google } from 'googleapis';  
import { promises as fs } from 'fs';  
import path from 'path';  
import { authenticate } from '@google-cloud/local-auth';  

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];  
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

async function saveCredentials(client: any): Promise<void> {  
    const content = await fs.readFile(CREDENTIALS_PATH);  
    const keys = JSON.parse(content.toString());  
    const key = keys.installed || keys.web;  
    const payload = JSON.stringify({  
        type: 'authorized_user',  
        client_id: key.client_id,  
        client_secret: key.client_secret,  
        refresh_token: client.credentials.refresh_token,  
    });  
    await fs.writeFile(TOKEN_PATH, payload);  
}  

async function authorize(): Promise<any> {  
    let client = await loadSavedCredentialsIfExist();  
    if (client) {  
        return client;  
    }  
    let new_client = await authenticate({  
        scopes: SCOPES,  
        keyfilePath: CREDENTIALS_PATH,  
    });  
    if (new_client?.credentials) {  
        console.log("new_client", new_client);
        await saveCredentials(new_client);  
    }  
    return client;  
}  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
    if (req.method === 'GET') {  
        try {  
            const auth = await authorize();  
            res.status(200).json({ message: 'Authorization successful', auth });  
        } catch (error) {  
            console.error('Authorization error:', error);  
            res.status(500).json({ error: 'Authorization failed' });  
        }  
    } else {  
        res.setHeader('Allow', ['GET']);  
        res.status(405).end(`Method ${req.method} Not Allowed`);  
    }  
}