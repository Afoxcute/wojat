# 🚀 Wojat Platform - Render Deployment Guide

This guide will help you deploy the Wojat memecoin hunting platform on Render as a web service.

## 📋 Prerequisites

- Render account (free tier available)
- GitHub repository with your Wojat code
- Environment variables ready

## 🔧 Deployment Steps

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub with the following files:
- `render.yaml` (Render configuration)
- `Dockerfile` (Docker configuration)
- `.dockerignore` (Docker ignore file)
- `package.json` (Root dependencies)
- `frontend/package.json` (Frontend dependencies)

### 2. Create Render Web Service

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign in or create an account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your Wojat repository

3. **Configure Service Settings**
   - **Name**: `wojat-platform`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (uses root)
   - **Build Command**: `npm install && cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npm run start`

### 3. Environment Variables

Add these environment variables in Render dashboard:

#### Required Variables:
```
NODE_ENV=production
PORT=10000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WS_URL=wss://wojat-platform.onrender.com/ws
```

#### Optional Variables (for full functionality):
```
OPENAI_API_KEY=your_openai_api_key
CONSUMER_KEY=your_twitter_consumer_key
CONSUMER_SECRET=your_twitter_consumer_secret
ZORO_ACCESS_TOKEN=your_twitter_access_token
ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
SOLANA_PRIVATE_KEY=your_solana_private_key
SOLANA_PUBLIC_KEY=your_solana_public_key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
BITQUERY_API_KEY=your_bitquery_api_key
ACCESS_TOKEN=your_bitquery_access_token
```

### 4. Deploy

1. **Start Deployment**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Monitor the build logs for any issues

2. **Wait for Deployment**
   - Build process takes 5-10 minutes
   - You'll see build logs in real-time
   - Service will be available at `https://wojat-platform.onrender.com`

## 🔧 Configuration Files

### render.yaml
```yaml
services:
  - type: web
    name: wojat-platform
    env: node
    plan: starter
    buildCommand: npm install && cd frontend && npm install && npm run build
    startCommand: cd frontend && npm run start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
    healthCheckPath: /
    autoDeploy: true
    branch: main
```

### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY . .
RUN cd frontend && npm run build
EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000
CMD ["cd", "frontend", "&&", "npm", "run", "start"]
```

## 🚨 Important Notes

### Render Free Tier Limitations:
- **Sleep Mode**: Service sleeps after 15 minutes of inactivity
- **Cold Start**: First request after sleep takes 30-60 seconds
- **Build Time**: 750 minutes per month
- **Bandwidth**: 100GB per month

### Production Optimizations:
1. **Enable Auto-Deploy**: Automatically deploys on git push
2. **Health Checks**: Configure health check endpoint
3. **Environment Variables**: Use Render's secure env var storage
4. **Custom Domain**: Add your own domain (paid feature)

## 🔍 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check build logs in Render dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **Service Won't Start**
   - Check start command is correct
   - Verify PORT environment variable
   - Check application logs

3. **Environment Variables Not Working**
   - Ensure variables are set in Render dashboard
   - Check variable names match your code
   - Restart service after adding variables

4. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check database is accessible from Render
   - Ensure RLS policies are configured

### Debug Commands:
```bash
# Check if service is running
curl https://wojat-platform.onrender.com

# Check health endpoint
curl https://wojat-platform.onrender.com/api/health

# View logs in Render dashboard
# Go to your service → Logs tab
```

## 📊 Monitoring

### Render Dashboard Features:
- **Metrics**: CPU, Memory, Response Time
- **Logs**: Real-time application logs
- **Deployments**: Build and deployment history
- **Environment**: Variable management

### Health Check Endpoint:
Add this to your Next.js API routes:
```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
}
```

## 🚀 Post-Deployment

### 1. Test Your Deployment
- Visit your Render URL
- Test all major features
- Check console for errors
- Verify environment variables

### 2. Set Up Monitoring
- Configure health checks
- Set up uptime monitoring
- Monitor performance metrics

### 3. Configure Domain (Optional)
- Add custom domain in Render dashboard
- Update DNS records
- Configure SSL certificate

## 💰 Cost Considerations

### Free Tier:
- Perfect for development and testing
- Limited to 750 build minutes/month
- Service sleeps after inactivity

### Paid Plans:
- **Starter**: $7/month - Always on, custom domains
- **Professional**: $25/month - More resources, better performance
- **Business**: $85/month - High availability, priority support

## 🎯 Next Steps

1. **Deploy to Render** using this guide
2. **Test all features** thoroughly
3. **Set up monitoring** and alerts
4. **Configure custom domain** (optional)
5. **Set up CI/CD** for automatic deployments

Your Wojat platform will be live at: `https://wojat-platform.onrender.com`

---

**Need Help?**
- Check Render documentation: https://render.com/docs
- Review build logs for specific errors
- Test locally first to ensure everything works
