const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY,
});

async function main() {
    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: "Explain how AI works in a few words",
      // input: msg,
      // previous_interaction_id: previousInteractionId,
    });

    // console.log(interaction.output_text);
    return interaction.output_text;
    // {
        // answer: interaction.output_text,
        // interactionId: interaction.id,
    // };
}

// module.exports = main;