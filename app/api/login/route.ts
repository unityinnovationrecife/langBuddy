import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(req: NextRequest) {
  try {
    const { email, senha } = await req.json();

    if (!email || !senha) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios', error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar usuário no Supabase
    const { data: user, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado', error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Comparar senha
    const senhaArmazenada = user.senha || user.password;
    
    if (!senhaArmazenada) {
      return NextResponse.json(
        { message: 'Erro ao validar usuário', error: 'Dados incompletos' },
        { status: 500 }
      );
    }

    const senhaValida = await bcrypt.compare(senha, senhaArmazenada);

    if (!senhaValida) {
      return NextResponse.json(
        { message: 'Senha incorreta', error: 'Senha incorreta' },
        { status: 401 }
      );
    }

    // Gerar JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nome: user.nome,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      {
        message: 'Login bem-sucedido!',
        token,
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { message: 'Erro ao fazer login', error: error.message },
      { status: 500 }
    );
  }
}
