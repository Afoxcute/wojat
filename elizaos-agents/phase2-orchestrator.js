// Phase 2 Orchestrator - Enhanced Social Media Automation
import MasterSchedulerAgent from './agents/master-scheduler-agent.js';
import ContentGeneratorAgent from './agents/content-generator-agent.js';
import TwitterManagerAgent from './agents/twitter-manager-agent.js';
import TelegramManagerAgent from './agents/telegram-manager-agent.js';
import DiscordManagerAgent from './agents/discord-manager-agent.js';
import dotenv from 'dotenv';

dotenv.config();

export class Phase2Orchestrator {
  constructor() {
    this.name = 'Phase 2 Orchestrator';
    this.description = 'Enhanced Social Media Automation System';
    this.version = '2.0.0';
    
    // Initialize master scheduler
    this.masterScheduler = new MasterSchedulerAgent();
    
    // Individual agents for direct access
    this.contentGenerator = new ContentGeneratorAgent();
    this.twitterManager = new TwitterManagerAgent();
    this.telegramManager = new TelegramManagerAgent();
    this.discordManager = new DiscordManagerAgent();
    
    this.agents = [
      this.masterScheduler,
      this.contentGenerator,
      this.twitterManager,
      this.telegramManager,
      this.discordManager
    ];
    
    this.isRunning = false;
  }

  // Initialize Phase 2 system
  async initialize() {
    try {
      console.log('🚀 Initializing Phase 2: Enhanced Social Media Automation...\n');
      
      // Initialize master scheduler (which initializes all agents)
      const initialized = await this.masterScheduler.initialize();
      
      if (initialized) {
        console.log('✅ Phase 2 system initialized successfully');
        console.log('📱 Available platforms: Twitter, Telegram, Discord');
        console.log('🤖 Active agents: Content Generator, Platform Managers, Master Scheduler');
        return true;
      } else {
        console.log('⚠️ Phase 2 system initialized with limited functionality');
        return false;
      }
    } catch (error) {
      console.error('❌ Failed to initialize Phase 2 system:', error);
      return false;
    }
  }

  // Run comprehensive social media campaign
  async runSocialMediaCampaign(campaignData) {
    try {
      console.log('🎯 Running comprehensive social media campaign...\n');
      
      const results = {
        timestamp: new Date().toISOString(),
        campaign: campaignData.type,
        platforms: {},
        metrics: {}
      };
      
      // 1. Generate content strategy
      console.log('📝 Generating content strategy...');
      const strategy = await this.masterScheduler.createContentStrategy(campaignData.trends);
      console.log('✅ Content strategy generated');
      
      // 2. Execute trending alerts
      if (campaignData.trendingData) {
        console.log('🔥 Posting trending alerts...');
        results.platforms.trending = await this.masterScheduler.postTrendingAlert(campaignData.trendingData);
        console.log('✅ Trending alerts posted');
      }
      
      // 3. Post educational content
      if (campaignData.educationalTopic) {
        console.log('📚 Posting educational content...');
        results.platforms.educational = await this.masterScheduler.postEducationalContent(campaignData.educationalTopic);
        console.log('✅ Educational content posted');
      }
      
      // 4. Post market analysis
      if (campaignData.marketAnalysis) {
        console.log('📊 Posting market analysis...');
        results.platforms.analysis = await this.masterScheduler.postMarketAnalysis(campaignData.marketAnalysis);
        console.log('✅ Market analysis posted');
      }
      
      // 5. Get performance metrics
      console.log('📊 Gathering performance metrics...');
      results.metrics = await this.masterScheduler.getPerformanceMetrics();
      console.log('✅ Performance metrics gathered');
      
      console.log('\n🎉 Social media campaign completed successfully!');
      return results;
      
    } catch (error) {
      console.error('❌ Error running social media campaign:', error);
      throw error;
    }
  }

  // Test all agents individually
  async testAllAgents() {
    console.log('🧪 Testing all Phase 2 agents...\n');
    
    const testResults = {};
    
    // Test Content Generator
    console.log('1️⃣ Testing Content Generator Agent...');
    try {
      const content = this.contentGenerator.generateTrendingAlert({
        token: '$BONK',
        price: 0.000012,
        volume: 1250000,
        hashtags: ['#solana', '#pump', '#memecoin']
      }, 'twitter');
      
      testResults.contentGenerator = {
        success: true,
        sampleContent: content.substring(0, 100) + '...'
      };
      console.log('   ✅ Content Generator: Working');
    } catch (error) {
      testResults.contentGenerator = { success: false, error: error.message };
      console.log('   ❌ Content Generator: Failed');
    }
    
    // Test Twitter Manager
    console.log('2️⃣ Testing Twitter Manager Agent...');
    try {
      const status = this.twitterManager.getStatus();
      testResults.twitterManager = {
        success: true,
        configured: status.isConfigured,
        status: status.status
      };
      console.log(`   ✅ Twitter Manager: ${status.isConfigured ? 'Configured' : 'Simulation mode'}`);
    } catch (error) {
      testResults.twitterManager = { success: false, error: error.message };
      console.log('   ❌ Twitter Manager: Failed');
    }
    
    // Test Telegram Manager
    console.log('3️⃣ Testing Telegram Manager Agent...');
    try {
      const status = this.telegramManager.getStatus();
      testResults.telegramManager = {
        success: true,
        configured: status.isConfigured,
        memberCount: status.memberCount
      };
      console.log(`   ✅ Telegram Manager: ${status.isConfigured ? 'Configured' : 'Simulation mode'}`);
    } catch (error) {
      testResults.telegramManager = { success: false, error: error.message };
      console.log('   ❌ Telegram Manager: Failed');
    }
    
    // Test Discord Manager
    console.log('4️⃣ Testing Discord Manager Agent...');
    try {
      const status = this.discordManager.getStatus();
      testResults.discordManager = {
        success: true,
        configured: status.isConfigured,
        memberCount: status.memberCount
      };
      console.log(`   ✅ Discord Manager: ${status.isConfigured ? 'Configured' : 'Simulation mode'}`);
    } catch (error) {
      testResults.discordManager = { success: false, error: error.message };
      console.log('   ❌ Discord Manager: Failed');
    }
    
    // Test Master Scheduler
    console.log('5️⃣ Testing Master Scheduler Agent...');
    try {
      const status = this.masterScheduler.getStatus();
      testResults.masterScheduler = {
        success: true,
        agentsCount: status.agentsCount,
        scheduleCount: status.scheduleCount
      };
      console.log(`   ✅ Master Scheduler: ${status.agentsCount} agents, ${status.scheduleCount} scheduled posts`);
    } catch (error) {
      testResults.masterScheduler = { success: false, error: error.message };
      console.log('   ❌ Master Scheduler: Failed');
    }
    
    console.log('\n📊 Test Results Summary:');
    const successCount = Object.values(testResults).filter(result => result.success).length;
    const totalCount = Object.keys(testResults).length;
    console.log(`   ✅ Successful: ${successCount}/${totalCount}`);
    
    return testResults;
  }

  // Start continuous social media automation
  async startAutomation(intervalMs = 300000) { // 5 minutes default
    if (this.isRunning) {
      console.log('⚠️ Automation already running');
      return;
    }

    this.isRunning = true;
    console.log(`🔄 Starting continuous social media automation (${intervalMs / 1000}s intervals)...`);

    try {
      // Start master scheduler monitoring
      await this.masterScheduler.startMonitoring(intervalMs);
      
      console.log('✅ Social media automation started successfully');
    } catch (error) {
      console.error('❌ Error starting automation:', error);
      this.isRunning = false;
    }
  }

  // Stop automation
  stopAutomation() {
    console.log('⏹️ Stopping social media automation...');
    this.masterScheduler.stopMonitoring();
    this.isRunning = false;
    console.log('✅ Automation stopped');
  }

  // Get system status
  getSystemStatus() {
    return {
      name: this.name,
      description: this.description,
      version: this.version,
      isRunning: this.isRunning,
      agents: this.masterScheduler.getAllAgentsStatus(),
      timestamp: new Date().toISOString()
    };
  }

  // Create sample campaign data
  createSampleCampaign() {
    return {
      type: 'trending-memecoin-campaign',
      trendingData: {
        token: '$BONK',
        price: 0.000012,
        volume: 1250000,
        hashtags: ['#solana', '#pump', '#memecoin', '#pumpfun']
      },
      educationalTopic: 'risk-management',
      marketAnalysis: {
        summary: 'Strong bullish momentum detected across multiple memecoins with high TikTok engagement',
        recommendation: 'Consider small positions in trending tokens with proper risk management',
        confidence: 0.75
      },
      trends: {
        topToken: '$BONK',
        sentiment: 0.8,
        volumeSpike: true
      }
    };
  }
}

// Main execution function
export async function main() {
  console.log('🚀 Starting Phase 2: Enhanced Social Media Automation...\n');

  try {
    // Create orchestrator
    const orchestrator = new Phase2Orchestrator();
    
    // Initialize system
    await orchestrator.initialize();
    
    // Test all agents
    console.log('\n🧪 Running comprehensive agent tests...');
    const testResults = await orchestrator.testAllAgents();
    
    // Create and run sample campaign
    console.log('\n🎯 Running sample social media campaign...');
    const sampleCampaign = orchestrator.createSampleCampaign();
    const campaignResults = await orchestrator.runSocialMediaCampaign(sampleCampaign);
    
    // Display results
    console.log('\n📊 Phase 2 System Status:');
    const status = orchestrator.getSystemStatus();
    console.log(`   Name: ${status.name}`);
    console.log(`   Version: ${status.version}`);
    console.log(`   Running: ${status.isRunning ? 'Yes' : 'No'}`);
    console.log(`   Agents: ${Object.keys(status.agents).length} active`);
    
    console.log('\n🎉 Phase 2 implementation complete!');
    console.log('\nNext steps:');
    console.log('1. Configure platform credentials in .env file');
    console.log('2. Start continuous automation with: orchestrator.startAutomation()');
    console.log('3. Monitor performance with: orchestrator.getSystemStatus()');
    console.log('4. Run custom campaigns with: orchestrator.runSocialMediaCampaign(data)');
    
  } catch (error) {
    console.error('❌ Fatal error in Phase 2:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (process.argv[1] && process.argv[1].endsWith('phase2-orchestrator.js')) {
  main();
}
