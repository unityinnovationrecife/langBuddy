import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (error) {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    // Extrair token do header
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { message: 'Token não fornecido', error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Verificar token
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { message: 'Token inválido', error: 'Token expirado ou inválido' },
        { status: 401 }
      );
    }

    // Buscar usuário no Supabase
    const { data: user, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', decoded.id)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado', error: 'Usuário não existe' },
        { status: 404 }
      );
    }

    // Retornar dados do usuário (sem senha!)
    const { senha, ...userData } = user;

    return NextResponse.json(
      {
        message: 'Dados do usuário',
        ...userData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar usuário', error: error.message },
      { status: 500 }
    );
  }
}
