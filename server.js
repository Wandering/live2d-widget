import express from 'express';
import openai from 'openai';
import cors from 'cors';

// 在此处填写你的 OpenAI API 密钥
openai.apiKey = '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';

const app = express();
app.use(cors());
app.use(express.json());

async function generateResponse(prompt) {
    try {
        const response = await openai.Completion.create({
            engine: 'text-davinci-002',
            prompt: prompt,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.5,
        });

        return response.choices[0].text.trim();
    } catch (error) {
        console.error('Error while generating response:', error);
        return '抱歉，我暂时无法回答你的问题。';
    }
}

app.post('/chat', async (req, res) => {
    const prompt = req.body.prompt;
    const response = await generateResponse(prompt);
    res.json({ response });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
