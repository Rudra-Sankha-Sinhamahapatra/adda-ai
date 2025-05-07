export async function sendMessage({ content, userId, characterId }: { content: string, userId: string, characterId: string }) {
  try {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, userId, characterId }),
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Failed to send message' }));
      throw new Error(errorData.error || 'Failed to send message');
    }
    
    //  the ReadableStream for processing by the caller
    return {
      stream: res.body,
      success: true
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export async function fetchMessages(characterId: string, userId: string) {
  try {
    const res = await fetch(`/api/messages?characterId=${characterId}&userId=${userId}`);
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to fetch messages');
    }
    
    // messages array 
    return await res.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}