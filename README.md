# Wojat - The TikTok Memecoin Hunter

## 🚀 **Single Command to Run All Phases**

```bash
# Install dependencies and start everything
npm run iris
# or
yarn iris
# or
node start-iris.js
```

**What this runs:**
- **Phase 1**: Data Collection & Display (Frontend)
- **Phase 2**: Social Media Automation (ElizaOS Agents)  
- **Phase 3**: AI-Powered Frontend (Frontend)
- **Phase 4**: Advanced AI Trading (ElizaOS Agents)

**Access Points:**
- Main App: http://localhost:3000
- AI Chat: http://localhost:3000/ai-chat
- Dashboard: http://localhost:3000/dashboard

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

