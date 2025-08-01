// Chatbot Configuration and API Management
class ChatbotConfig {
    constructor() {
        this.providers = {
            openai: {
                name: 'OpenAI GPT',
                endpoint: 'https://api.openai.com/v1/chat/completions',
                model: 'gpt-3.5-turbo',
                maxTokens: 1000
            },
            anthropic: {
                name: 'Anthropic Claude',
                endpoint: 'https://api.anthropic.com/v1/messages',
                model: 'claude-3-sonnet-20240229',
                maxTokens: 1000
            },
            gemini: {
                name: 'Google Gemini',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
                model: 'gemini-pro',
                maxTokens: 1000
            }
        };
        
        this.currentProvider = 'openai'; // Default provider
        this.apiKey = null;
        this.conversationHistory = [];
        this.maxHistoryLength = 10;
    }

    // Set API key for the current provider
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        localStorage.setItem('chatbot_api_key', apiKey);
    }

    // Get stored API key
    getApiKey() {
        if (!this.apiKey) {
            this.apiKey = localStorage.getItem('chatbot_api_key');
        }
        return this.apiKey;
    }

    // Set current provider
    setProvider(provider) {
        if (this.providers[provider]) {
            this.currentProvider = provider;
            localStorage.setItem('chatbot_provider', provider);
        }
    }

    // Get current provider
    getProvider() {
        if (!this.currentProvider) {
            this.currentProvider = localStorage.getItem('chatbot_provider') || 'openai';
        }
        return this.currentProvider;
    }

    // Add message to conversation history
    addToHistory(role, content) {
        this.conversationHistory.push({ role, content, timestamp: new Date() });
        
        // Keep only the last N messages
        if (this.conversationHistory.length > this.maxHistoryLength) {
            this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength);
        }
    }

    // Get conversation history for API calls
    getHistory() {
        return this.conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content
        }));
    }

    // Clear conversation history
    clearHistory() {
        this.conversationHistory = [];
    }

    // Generate system prompt based on context
    getSystemPrompt() {
        return `You are TaskCrown AI Assistant, a helpful AI assistant for employees working on tasks and projects. 

Your role is to help with:
- Task breakdown and planning
- Problem solving and debugging
- Code review and suggestions
- Learning and explaining concepts
- Best practices and industry standards
- Project management advice

Be concise, helpful, and professional. If you don't know something, say so rather than making things up.`;
    }

    // Send message to AI provider
    async sendMessage(message) {
        const provider = this.getProvider();
        const apiKey = this.getApiKey();

        if (!apiKey) {
            throw new Error('API key not configured. Please set your API key in the chatbot settings.');
        }

        // Add user message to history
        this.addToHistory('user', message);

        try {
            let response;
            switch (provider) {
                case 'openai':
                    response = await this.callOpenAI(message);
                    break;
                case 'anthropic':
                    response = await this.callAnthropic(message);
                    break;
                case 'gemini':
                    response = await this.callGemini(message);
                    break;
                default:
                    throw new Error(`Unknown provider: ${provider}`);
            }

            // Add AI response to history
            this.addToHistory('assistant', response);
            return response;

        } catch (error) {
            console.error('Chatbot API Error:', error);
            throw error;
        }
    }

    // Call OpenAI API
    async callOpenAI(message) {
        const provider = this.providers.openai;
        const history = this.getHistory();
        
        const response = await fetch(provider.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getApiKey()}`
            },
            body: JSON.stringify({
                model: provider.model,
                messages: [
                    { role: 'system', content: this.getSystemPrompt() },
                    ...history
                ],
                max_tokens: provider.maxTokens,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`OpenAI API Error: ${error.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Call Anthropic API
    async callAnthropic(message) {
        const provider = this.providers.anthropic;
        const history = this.getHistory();
        
        const response = await fetch(provider.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.getApiKey(),
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: provider.model,
                max_tokens: provider.maxTokens,
                messages: [
                    { role: 'user', content: this.getSystemPrompt() + '\n\n' + history.map(h => `${h.role}: ${h.content}`).join('\n') }
                ]
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Anthropic API Error: ${error.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.content[0].text;
    }

    // Call Google Gemini API
    async callGemini(message) {
        const provider = this.providers.gemini;
        const history = this.getHistory();
        
        const response = await fetch(`${provider.endpoint}?key=${this.getApiKey()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: this.getSystemPrompt() + '\n\n' + history.map(h => `${h.role}: ${h.content}`).join('\n')
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: provider.maxTokens,
                    temperature: 0.7
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Gemini API Error: ${error.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    // Get available providers
    getAvailableProviders() {
        return Object.keys(this.providers).map(key => ({
            key,
            name: this.providers[key].name
        }));
    }

    // Validate API key format
    validateApiKey(apiKey, provider) {
        if (!apiKey || apiKey.trim() === '') {
            return false;
        }

        switch (provider) {
            case 'openai':
                return apiKey.startsWith('sk-') && apiKey.length > 20;
            case 'anthropic':
                return apiKey.startsWith('sk-ant-') && apiKey.length > 20;
            case 'gemini':
                return apiKey.length > 20; // Google API keys don't have a specific prefix
            default:
                return apiKey.length > 10;
        }
    }
}






// Global chatbot instance
window.chatbotConfig = new ChatbotConfig(); 