// server.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// 允許前端跨域請求（簡單示範）
import cors from 'cors';
app.use(cors());

// 處理前端請求天氣
app.get('/weather', async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const key = process.env.OPENWEATHER_API_KEY;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=zh_tw`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: '取得天氣資料失敗' });
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
