import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const {
      nome,
      email,
      senha,
      idioma_nativo,
      idioma_aprendendo,
      pais,
      estado,
      cidade,
      telefone,
      interesses,
    } = await req.json();

    // Validações
    if (!nome || !email || !senha) {
      return NextResponse.json(
        { message: 'Nome, email e senha são obrigatórios', error: 'Campos obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se email já existe
    const { data: existingUser } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email já cadastrado', error: 'Email já existe' },
        { status: 409 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar usuário (inserir apenas os campos básicos)
    const { data: user, error } = await supabase
      .from('usuarios')
      .insert({
        nome: nome,
        email,
        senha: hashedPassword,
      })
      .select('id, nome, email')
      .single();

    if (error) {
      console.error('Erro ao criar usuário:', error);
      return NextResponse.json(
        { message: 'Erro ao criar usuário', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro no cadastro:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar', error: error.message },
      { status: 500 }
    );
  }
}
