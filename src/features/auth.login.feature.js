// ✅ MUDE ESTE IP para o IP da sua máquina (que você pegou com 'ipconfig')
// Use a porta do seu NestJS (3000)
const API_URL = 'http://192.168.1.1:3000/identity'; 

/**
 * Chama a API de login do backend.
 * * @param {string} email O e-mail do usuário.
 * @param {string} password A senha (em texto plano) do usuário.
 * @returns {Promise<{access_token: string}>} Uma promessa que resolve com o token de acesso.
 */
export const loginUser = async (email, password) => {
  try {
    // Note que só usamos '/login' porque a URL base já tem '/identity'
    const response = await fetch(`${API_URL}/login`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Se a resposta não for OK (ex: 401 Unauthorized, 500)
    if (!response.ok) {
      const errorData = await response.json();
      // Joga um erro com a mensagem do backend
      throw new Error(errorData.message || 'E-mail ou senha inválidos.');
    }

    // Se for OK (200), retorna o JSON com o token
    return response.json();

  } catch (error) {
    console.error('Falha no serviço de login:', error);
    // Re-joga o erro para a tela (o 'Index.js') poder tratar (ex: mostrar um Alert)
    throw error;
  }
};