// AI Chat Integration
// Conecta com API externa de IA via n8n ou diretamente

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface ChatResponse {
  message: string
  success: boolean
}

// Opção 1: Via n8n webhook (RECOMENDADO)
export async function sendChatMessage(message: string, language: string): Promise<ChatResponse> {
  try {
    const response = await fetch('https://SEU_N8N/webhook/jtech/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        language,
        context: 'jtech-support',
        timestamp: new Date().toISOString()
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send message')
    }

    const data = await response.json()
    return {
      message: data.response,
      success: true
    }
  } catch (error) {
    console.error('Chat error:', error)
    return {
      message: 'Desculpe, estou indisponível no momento.',
      success: false
    }
  }
}

// Opção 2: Diretamente com OpenAI (se tiver API key)
export async function sendChatMessageDirect(message: string): Promise<ChatResponse> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  if (!apiKey) {
    console.warn('OpenAI API key not configured')
    return {
      message: 'Chat não configurado',
      success: false
    }
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente virtual da Jtech, empresa de soluções tecnológicas para saneamento. Responda de forma profissional e prestativa.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    const data = await response.json()
    return {
      message: data.choices[0].message.content,
      success: true
    }
  } catch (error) {
    console.error('OpenAI error:', error)
    return {
      message: 'Erro ao processar mensagem',
      success: false
    }
  }
}

// Histórico de chat no localStorage
export function getChatHistory(): ChatMessage[] {
  const history = localStorage.getItem('jtech_chat_history')
  return history ? JSON.parse(history) : []
}

export function saveChatMessage(message: ChatMessage) {
  const history = getChatHistory()
  history.push(message)
  // Manter apenas últimas 50 mensagens
  if (history.length > 50) {
    history.shift()
  }
  localStorage.setItem('jtech_chat_history', JSON.stringify(history))
}

export function clearChatHistory() {
  localStorage.removeItem('jtech_chat_history')
}
