# Wojat - The TikTok Memecoin Hunter

## 🚀 **Single Command to Run All Phases**

### Local Development
```bash
# Install dependencies and start everything
npm run wojat
# or
yarn wojat
# or
node start-iris.js
```

### Railway Deployment
```bash
# Deploy to Railway (one-click)
# 1. Push to GitHub
# 2. Connect to Railway
# 3. Set environment variables
# 4. Deploy!
```

**What this runs:**
- **Phase 1**: Data Collection & Display (Frontend)
- **Phase 2**: Social Media Automation (ElizaOS Agents)  
- **Phase 3**: AI-Powered Frontend (Frontend)
- **Phase 4**: Advanced AI Trading (ElizaOS Agents)

**Access Points:**
- **Local**: Main App: http://localhost:3000
- **Local**: AI Chat: http://localhost:3000/ai-chat
- **Local**: Dashboard: http://localhost:3000/dashboard
- **Railway**: https://your-app.railway.app

---

**Description:**  
Wojat is an autonomous AI-powered agent that hunts for the hottest memecoins trending on TikTok and provides real-time analytics on their performance. Designed for crypto enthusiasts and memecoin hunters, Wojat bridges the gap between TikTok meme culture and emerging cryptocurrency trends.

By leveraging TikTok's trending data and Pump.fun's database of launched tokens, Wojat offers users insights into memecoin popularity, trading volume, and market movements. It also integrates BONK tokens to incentivize premium features for advanced users.

---

## Key Features

1. **Real-Time Hashtag Analysis:**

   - Monitors TikTok for the hottest hashtags and trending descriptions in the past 24 hours (#solana, #pump, #pumpfun, #meme, #memecoin).
   - Classifies crypto-related content based on comments containing $TICKER references.

2. **Pattern Matching:**

   - Matches trending TikTok memes against Pump.fun's database of launched tokens to identify related coins.
   - Categorizes multiple tokens per meme for comprehensive coverage.

3. **Data Insights:**

   - Displays filtered lists of the top trending coins and TikTok memes with the following analytics:
     - 24-hour trading volume of the coin.
     - 24-hour view count on TikTok.

4. **Automated Social Media Updates:**

   - Posts tweets from the Iris Twitter account about trending memecoins when:
     - Volume growth surpasses $10K within an hour.
     - Growth rate is at least 100% ($5K → $10K+).

5. **Monetization:**
   - Free version: View the first 5 tokens.
   - Premium version: Full access for 7 days at 499,999 BONK

---

## Technical Stack

- **AI and Data Processing:**
  - OpenAI for natural language processing and classification of crypto-related content.
- **Backend:**
  - Supabase for database and API integration.
- **Frontend:**
  - Next.js, ShadCN, and TailwindCSS for an intuitive user interface.
- **Incentivization Layer:**
  - BONK tokens to reward users and enable premium features.

---

## How It Works

1. **Data Collection:**

   - Wojat scrapes TikTok for relevant hashtags, descriptions, and comments.
   - Patterns are matched with Pump.fun's database to identify associated tokens.

2. **Trend Analysis:**

   - Analyzes the trading volume and TikTok watch metrics for each identified token.
   - Identifies surges in trading volume and view counts in real-time.

3. **User Notifications:**

   - Displays trending tokens in an easy-to-use dashboard.
   - Posts updates about the hottest memecoins on Twitter to keep followers informed.

4. **Premium Features:**
   - Unlock detailed analytics and exclusive insights by subscribing with BONK tokens.

---

## Why Wojat?

In the fast-paced world of memecoins, Wojat provides a cutting-edge advantage for traders and enthusiasts. By combining TikTok's viral potential with on-chain data from Pump.fun, Wojat delivers actionable insights and real-time updates, empowering users to capitalize on emerging trends.

---

## Tagline

_"An Autonomous AI Agent that browses TikTok to help you find the hottest memecoins before they pump."_

---

## 🚂 Railway Deployment

### Quick Deploy
1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Connect to Railway**: Go to [railway.app](https://railway.app) and deploy from GitHub
3. **Set Environment Variables**: Add your API keys in Railway dashboard
4. **Deploy**: Railway will automatically build and deploy your app

### Required Environment Variables
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Documentation
- 📖 **Railway Guide**: See `RAILWAY_DEPLOYMENT_GUIDE.md` for detailed instructions
- ⚡ **Quick Start**: See `RAILWAY_QUICK_START.md` for one-click deployment
- 🔧 **Test Config**: Run `npm run test:railway` to validate setup

