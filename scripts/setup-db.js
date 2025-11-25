#!/usr/bin/env node
/**
 * Script para criar tabelas no Supabase via SQL
 */

const https = require('https');

const SUPABASE_URL = 'https://dkfanqfvkuloilurfzji.supabase.co';
const SUPABASE_SERVICE_ROLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZmFucWZ2a3Vsb2lsdXJmemppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjk4ODMxNiwiZXhwIjoyMDc4NTY0MzE2fQ.i35crqtjwnfyfbsdo2K-1fgQj4-egv_9jaCXNUt02jM';

const SQL = `
-- Criar tabela users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255) NOT NULL,
  image TEXT,
  nativeLanguage VARCHAR(100),
  learningLanguage VARCHAR(100),
  country VARCHAR(100),
  state VARCHAR(100),
  city VARCHAR(100),
  phone VARCHAR(20),
  interests TEXT[] DEFAULT ARRAY[]::TEXT[],
  description TEXT,
  emailVerified TIMESTAMP,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Criar índices
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Criar tabela friendRequests
CREATE TABLE IF NOT EXISTS friendRequests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  senderId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiverId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'PENDING',
  createdAt TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_friend_request UNIQUE(senderId, receiverId)
);

CREATE INDEX IF NOT EXISTS idx_friendRequests_receiverId ON friendRequests(receiverId);
CREATE INDEX IF NOT EXISTS idx_friendRequests_senderId ON friendRequests(senderId);

-- Criar tabela friends
CREATE TABLE IF NOT EXISTS friends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  friendId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_friendship UNIQUE(userId, friendId)
);

CREATE INDEX IF NOT EXISTS idx_friends_userId ON friends(userId);

-- Criar tabela conversations
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1Id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user2Id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_conversation UNIQUE(user1Id, user2Id)
);

CREATE INDEX IF NOT EXISTS idx_conversations_user1Id ON conversations(user1Id);
CREATE INDEX IF NOT EXISTS idx_conversations_user2Id ON conversations(user2Id);

-- Criar tabela messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversationId UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  senderId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversationId ON messages(conversationId);
CREATE INDEX IF NOT EXISTS idx_messages_senderId ON messages(senderId);
`;

async function createTables() {
  return new Promise((resolve, reject) => {
    const path = '/rest/v1/rpc/sql';
    
    const options = {
      hostname: 'dkfanqfvkuloilurfzji.supabase.co',
      port: 443,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`,
        'apikey': SUPABASE_SERVICE_ROLE,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log('✅ Tabelas criadas com sucesso!');
          resolve(true);
        } else {
          console.log(`❌ Erro: Status ${res.statusCode}`);
          console.log(data);
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (e) => {
      console.error('❌ Erro na requisição:', e.message);
      reject(e);
    });

    // Enviar SQL
    req.write(JSON.stringify({ query: SQL }));
    req.end();
  });
}

console.log('🚀 Criando tabelas no Supabase...');
createTables()
  .then(() => {
    console.log('\n✨ Pronto! Agora você pode:');
    console.log('1. Ir para http://localhost:3000/login');
    console.log('2. Registrar um novo usuário');
    console.log('3. Fazer login');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Erro:', err.message);
    console.log('\n⚠️  Se o erro for sobre RLS/policies:');
    console.log('1. Vá para https://app.supabase.com/project/dkfanqfvkuloilurfzji');
    console.log('2. Vá para Authentication > Policies');
    console.log('3. Desabilite RLS em cada tabela (temporariamente para testar)');
    process.exit(1);
  });
