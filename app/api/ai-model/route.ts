// import Constants from "@/data/Constants";
// import { NextRequest } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   //   baseURL: "https://openrouter.ai/api/v1",
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_AI_API_KEY,
// });

// export const maxDuration = 300;

// export async function POST(req: NextRequest) {
//   try {
//     const { model, description, imageUrl } = await req.json();

//     if (!model || !description || !imageUrl) {
//       return new Response("Missing model, description, or imageUrl", {
//         status: 400,
//       });
//     }

//     const ModelObj = Constants.AiModelList.find((item) => item.name === model);
//     const modelName =
//       ModelObj?.modelName ?? "google/gemini-2.0-pro-exp-02-05:free";

//     console.log("Using model:", modelName);

//     const response = await openai.chat.completions.create({
//       model: modelName,
//       stream: true,
//       messages: [
//         {
//           role: "user",
//           content: [
//             { type: "text", text: description },
//             { type: "image_url", image_url: { url: imageUrl } },
//           ],
//         },
//       ],
//     });

//     const stream = new ReadableStream({
//       async start(controller) {
//         try {
//           for await (const chunk of response) {
//             const text = chunk.choices?.[0]?.delta?.content || "";
//             controller.enqueue(new TextEncoder().encode(text));
//           }
//         } catch (err) {
//           controller.enqueue(
//             new TextEncoder().encode("[Streaming error occurred]")
//           );
//           console.error("Stream error:", err);
//         } finally {
//           controller.close();
//         }
//       },
//     });

//     return new Response(stream, {
//       headers: { "Content-Type": "text/plain; charset=utf-8" },
//     });
//   } catch (error: any) {
//     console.error("POST /api/ai-model error:", error);

//     return new Response(
//       JSON.stringify({
//         error: true,
//         message: "AI model processing failed",
//         details: error?.message || error,
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }
import Constants from "@/data/Constants";
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_AI_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Wireframe to Code App",
  },
});

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { model, description, imageUrl } = body;

    // ✅ Better validation with structured error
    if (!model || !description || !imageUrl) {
      return new Response(
        JSON.stringify({ error: { message: "Missing required fields" } }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Optional: log inputs for debugging
    console.log("🧪 Prompt used:", description);
    console.log("📦 Model:", model);
    console.log("🖼️ Image URL:", imageUrl);

    // ✅ Resolve model name or use fallback
    const modelObj = Constants.AiModelList.find((item) => item.name === model);
    const modelName =
      modelObj?.modelName || "deepseek/deepseek-chat-v3-0324:free";

    console.log("🚀 Using model:", modelName);

    // ✅ OpenAI stream generation
    const response = await openai.chat.completions.create({
      model: modelName,
      stream: true,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: description },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
    });

    // ✅ Stream the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.choices?.[0]?.delta?.content || "";
            controller.enqueue(new TextEncoder().encode(text));
          }
        } catch (err) {
          console.error("❌ Error in streaming loop:", err);
          controller.enqueue(
            new TextEncoder().encode("Error: Failed to generate response.\n")
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error: any) {
    console.error("🔥 AI model error:", JSON.stringify(error, null, 2));
    return new Response(
      JSON.stringify({
        error: true,
        message: "AI model failed to generate response",
        details: error?.message || error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
