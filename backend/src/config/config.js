import dotenv from 'dotenv'

dotenv.config()

export const config = {
  // Server
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  apiUrl: process.env.API_URL || 'http://localhost:5000',

  // Database
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/resumind',

  // Session
  sessionSecret: process.env.SESSION_SECRET || 'dev-secret-key',
  sessionMaxAge: parseInt(process.env.SESSION_MAX_AGE) || 604800000, // 7 days

  // CORS
  corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(','),

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'jwt-secret-key',

  // EmailJS Configuration
  emailJsServiceId: process.env.EMAILJS_SERVICE_ID || '',
  emailJsPublicKey: process.env.EMAILJS_PUBLIC_KEY || '',
  emailJsPrivateKey: process.env.EMAILJS_PRIVATE_KEY || '',
  emailJsTemplateId: process.env.EMAILJS_TEMPLATE_ID || 'template_otp_verification',

  // OpenAI Configuration
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openaiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',

  // AI Service
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:8000',
  aiApiKey: process.env.AI_API_KEY || '',

  // File Upload
  pdfMaxSize: parseInt(process.env.PDF_UPLOAD_MAX_SIZE) || 10485760, // 10MB
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  tempDir: process.env.TEMP_DIR || './temp',

  // OpenAI Configuration
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openaiModel: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
}

export default config
