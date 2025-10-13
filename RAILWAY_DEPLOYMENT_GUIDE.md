# 🚂 Railway Deployment Guide for Wojat Platform

This guide will help you deploy the Wojat memecoin hunting platform on Railway.

## 📋 Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Your Wojat code should be in a GitHub repository
3. **Environment Variables**: Prepare your API keys and configuration

## 🚀 Quick Deployment

### Step 1: Connect to Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your Wojat repository
5. Railway will automatically detect the project structure

### Step 2: Configure Environment Variables

In your Railway project dashboard:

1. Go to the "Variables" tab
2. Add the following required variables:

```env
# Required
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key

# Frontend
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WS_URL=wss://your-railway-app.railway.app/ws
```

3. Add optional variables as needed (see `railway.env.example`)

### Step 3: Deploy

1. Railway will automatically start the build process
2. The deployment will use the `start:railway` command
3. Monitor the build logs for any issues

## 🔧 Configuration Files

The following files are configured for Railway deployment:

### `railway.json`
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start:railway",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### `nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ['nodejs_18', 'yarn']

[phases.install]
cmds = ['yarn install --frozen-lockfile']

[phases.build]
cmds = [
  'cd frontend && yarn install --frozen-lockfile',
  'cd frontend && yarn build',
  'cd elizaos-agents && yarn install --frozen-lockfile'
]

[start]
cmd = 'npm run start:railway'
```

### `Procfile`
```
web: npm run start:railway
```

## 🌐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_URL` | Your Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous key | `eyJ...` |
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-...` |
| `NEXT_PUBLIC_SUPABASE_URL` | Same as SUPABASE_URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same as SUPABASE_ANON_KEY | `eyJ...` |

### Optional Variables

| Variable | Description | Required For |
|----------|-------------|--------------|
| `SOLANA_PRIVATE_KEY` | Base58 private key | Trading features |
| `SOLANA_PUBLIC_KEY` | Public key | Trading features |
| `CONSUMER_KEY` | Twitter API key | Social media automation |
| `CONSUMER_SECRET` | Twitter API secret | Social media automation |
| `ZORO_ACCESS_TOKEN` | Twitter access token | Social media automation |
| `ZORO_ACCESS_TOKEN_SECRET` | Twitter access token secret | Social media automation |
| `BITQUERY_API_KEY` | Bitquery API key | Blockchain data |
| `ACCESS_TOKEN` | Bitquery access token | Blockchain data |

## 🏗️ Build Process

Railway will automatically:

1. **Install Dependencies**: Install root and frontend dependencies
2. **Build Frontend**: Run `npm run build` in the frontend directory
3. **Start Services**: Run the Railway startup script

## 📊 Monitoring

### Health Checks

- **Health Check Path**: `/`
- **Health Check Timeout**: 100ms
- **Restart Policy**: Restart on failure (max 10 retries)

### Logs

Monitor your deployment logs in the Railway dashboard:
- Build logs show the installation and build process
- Runtime logs show application output and errors

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are properly listed in package.json
   - Ensure Node.js version compatibility (18+)

2. **Environment Variables**
   - Verify all required variables are set
   - Check variable names for typos

3. **Port Issues**
   - Railway automatically sets the PORT environment variable
   - The application listens on `process.env.PORT || 3000`

4. **Memory Issues**
   - Railway provides different plan tiers with varying memory limits
   - Monitor memory usage in the Railway dashboard

### Debug Commands

```bash
# Check environment variables
echo $SUPABASE_URL
echo $OPENAI_API_KEY

# Check Node.js version
node --version

# Check if services are running
ps aux | grep node
```

## 🚀 Deployment Commands

### Manual Deployment

If you need to deploy manually:

```bash
# Install dependencies
npm install
cd frontend && npm install
cd ../elizaos-agents && npm install

# Build frontend
cd ../frontend && npm run build

# Start application
cd .. && npm run start:railway
```

### Local Testing

Test the Railway configuration locally:

```bash
# Set environment variables
export PORT=3000
export NODE_ENV=production

# Start with Railway script
npm run start:railway
```

## 📈 Scaling

### Railway Plans

- **Hobby**: $5/month - Good for development and testing
- **Pro**: $20/month - Better for production with more resources
- **Team**: Custom pricing - For teams and enterprise

### Performance Optimization

1. **Enable Caching**: Use Railway's built-in caching
2. **Optimize Builds**: Minimize build time with proper dependency management
3. **Monitor Resources**: Use Railway's metrics to optimize resource usage

## 🔒 Security

### Environment Variables

- Never commit sensitive keys to your repository
- Use Railway's secure environment variable system
- Rotate API keys regularly

### HTTPS

- Railway automatically provides HTTPS
- Your app will be available at `https://your-app.railway.app`

## 📞 Support

### Railway Support

- **Documentation**: [docs.railway.app](https://docs.railway.app)
- **Community**: [Railway Discord](https://discord.gg/railway)
- **Status**: [status.railway.app](https://status.railway.app)

### Wojat Support

- Check the main README.md for general setup
- Review the QUICK_START.md for local development
- Check the SUPABASE_SETUP_GUIDE.md for database setup

## 🎉 Success!

Once deployed, your Wojat platform will be available at:
`https://your-app-name.railway.app`

The platform includes:
- ✅ Frontend web interface
- ✅ AI chat system
- ✅ Twitter automation
- ✅ Data collection services
- ✅ Trading system (if configured)

Happy memecoin hunting! 🚀
