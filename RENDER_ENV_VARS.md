# 🔑 Render.com Environment Variables for Wojat Platform

## **Required Environment Variables**

Add these in your Render dashboard under "Environment Variables":

### **Core Configuration**
```env
NODE_ENV=production
PORT=3000
```

### **AI Services**
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### **Database (Supabase)**
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### **Blockchain Data (Bitquery)**
```env
BITQUERY_API_KEY=your_bitquery_api_key_here
ACCESS_TOKEN=your_bitquery_access_token_here
```

### **Twitter Integration**
```env
CONSUMER_KEY=your_twitter_consumer_key_here
CONSUMER_SECRET=your_twitter_consumer_secret_here
ZORO_ACCESS_TOKEN=your_twitter_access_token_here
ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret_here
```

### **Solana Integration**
```env
SOLANA_PRIVATE_KEY=your_base58_private_key_here
SOLANA_PUBLIC_KEY=your_public_key_here
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## **Optional Environment Variables**

### **Enhanced RPC Services**
```env
HELIUS_API_KEY=your_helius_api_key_here
BIRDEYE_API_KEY=your_birdeye_api_key_here
```

### **Telegram Integration**
```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHANNEL_ID=your_telegram_channel_id_here
```

### **Discord Integration**
```env
DISCORD_BOT_TOKEN=your_discord_bot_token_here
DISCORD_GUILD_ID=your_discord_guild_id_here
```

### **Monitoring & Analytics**
```env
GOOGLE_ANALYTICS_ID=your_google_analytics_id_here
SENTRY_DSN=your_sentry_dsn_here
```

### **Security**
```env
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=https://your-domain.com
```

## **How to Add in Render Dashboard**

1. **Go to your service dashboard**
2. **Click "Environment" tab**
3. **Click "Add Environment Variable"**
4. **Enter the key and value**
5. **Mark sensitive ones as "Secret"**
6. **Click "Save Changes"**

## **Minimum Required for Basic Functionality**

For the platform to work with basic features, you need at least:

```env
NODE_ENV=production
PORT=3000
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## **For Full Functionality**

Add all the required variables above to enable:
- ✅ AI chat functionality
- ✅ Database operations
- ✅ Twitter automation
- ✅ Solana trading
- ✅ Blockchain data fetching
- ✅ Social media management

## **Security Notes**

- **Never commit** these values to your repository
- **Mark sensitive values** as "Secret" in Render
- **Use strong, unique values** for all keys
- **Rotate keys regularly** for security
- **Monitor usage** to detect unauthorized access

## **Testing Your Configuration**

After adding environment variables:

1. **Redeploy your service**
2. **Check the logs** for any configuration errors
3. **Visit `/health`** endpoint to verify services are running
4. **Test features** that require the API keys

---

**💡 Pro Tip:** Start with the minimum required variables and add more as you need additional features!
