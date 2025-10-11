# ⚡ Quick Environment Variables Reference

## **🚀 Essential for Render Deployment**

Copy and paste these into your Render dashboard:

```env
NODE_ENV=production
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## **🔧 For Full Functionality**

Add these for complete features:

```env
# Blockchain Data
BITQUERY_API_KEY=your_bitquery_api_key_here
ACCESS_TOKEN=your_bitquery_access_token_here

# Twitter Automation
CONSUMER_KEY=your_twitter_consumer_key_here
CONSUMER_SECRET=your_twitter_consumer_secret_here
ZORO_ACCESS_TOKEN=your_twitter_access_token_here
ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret_here

# Solana Trading
SOLANA_PRIVATE_KEY=your_base58_private_key_here
SOLANA_PUBLIC_KEY=your_public_key_here
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## **📋 Step-by-Step**

1. **Go to Render Dashboard**
2. **Select your service**
3. **Click "Environment" tab**
4. **Add each variable above**
5. **Mark sensitive ones as "Secret"**
6. **Click "Save Changes"**
7. **Redeploy your service**

## **✅ Verification**

After adding variables, check:
- **Health endpoint**: `https://your-app.onrender.com/health`
- **Service logs** for any errors
- **Frontend loads** correctly

---

**🎯 That's it! Your Wojat platform will be fully configured!**
