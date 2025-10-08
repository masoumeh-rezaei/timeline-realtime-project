# 📊 Real-Time Crypto Dashboard

یک داشبورد حرفه‌ای و ساده برای نمایش داده‌های **رمزارزها (BTC, ETH, ADA)** به‌صورت زنده با استفاده از **WebSocket + Next.js + Recharts**  
این پروژه شامل نمایش قیمت‌ها، تغییرات درصدی، حجم معاملات و نمودارهای زنده است.

---

## 🚀 ویژگی‌ها

- ✅ **داده‌های بلادرنگ (Live Data)** از طریق WebSocket  
- 📈 **نمودار خطی قیمت‌ها (Line Chart)**  
- 📊 **نمودار میله‌ای حجم معاملات (Bar Chart)**  
- 🕯️ **نمودار کندل‌استیک (Candlestick Chart)** برای تحلیل تکنیکال  
- 💡 مدیریت داده‌ها با **React Context + Custom Hook**  
- ⚡ UI مدرن با **TailwindCSS + Recharts**

---

## 🧠 تکنولوژی‌ها

| دسته | تکنولوژی |
|------|-----------|
| Frontend | [Next.js 15](https://nextjs.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Charts | [Recharts](https://recharts.org/en-US/) |
| Data Layer | React Context + Custom Hook |
| Backend (Mock Data) | Node.js + WebSocket (ws) |

---

## ⚙️ راه‌اندازی پروژه

### 1️⃣ کلون کردن مخزن
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2️⃣ نصب وابستگی‌ها
npm install

3️⃣ اجرای سرور WebSocket (داده‌های ساختگی)
cd server
node server.js


یا اگر سرور در ریشه پروژه است:

node server.js


سرور WS به‌صورت پیش‌فرض روی آدرس ws://localhost:8080 فعال می‌شود.

4️⃣ اجرای Frontend
npm run dev
