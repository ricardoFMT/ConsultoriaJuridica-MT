import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

let db;

async function initDatabase() {
  await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
  db = await open({
    filename: path.join(__dirname, 'data', 'contacts.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

initDatabase().catch((error) => {
  console.error('Erro ao inicializar o banco de dados:', error);
  process.exit(1);
});

async function sendEmail({ name, email, phone, subject, message }) {
  if (!process.env.MAIL_HOST) {
    console.warn('MAIL_HOST não configurado. E-mails não serão enviados.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 587),
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `Site Institucional <${process.env.MAIL_FROM || process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO || process.env.MAIL_USER,
    subject: `[Contato] ${subject}`,
    replyTo: email,
    text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone || 'Não informado'}\n\nMensagem:\n${message}`
  });
}

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
  }

  try {
    await db.run(
      'INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      name,
      email,
      phone || null,
      subject,
      message
    );

    await sendEmail({ name, email, phone, subject, message });

    return res.status(200).json({ message: 'Mensagem registrada com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar mensagem:', error);
    return res.status(500).json({ message: 'Não foi possível registrar a mensagem no momento.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});