import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const askProductGroq = async (req, res) => {
  try {
    const { question, product } = req.body;

    const prompt = `
You are an expert e-commerce assistant.

Product Name: ${product.name}
Category: ${product.category}
Price: ${product.price}
Description: ${product.description}

User Question: ${question}

Give clear, helpful and simple answer.
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant", // ✅ WORKING MODEL
      temperature: 0.4,
    });

    const reply = chatCompletion.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.error("❌ Groq AI Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Groq AI failed" });
  }
};
