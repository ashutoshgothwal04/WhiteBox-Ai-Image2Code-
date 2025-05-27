// import dedent from 'dedent';
// export default {
//     PROMPT_OLD: dedent`
//     You are an expert frontend frontend React developer. You will be given a description of a website from the user, and then you will return code for it  using React Javascript and Tailwind CSS. Follow the instructions carefully, it is very important for my job. I will tip you $1 million if you do a good job:

// - Think carefully step by step about how to recreate the UI described in the prompt.
// - Create a React component for whatever the user asked you to create and make sure it can run by itself by using a default export
// - Feel free to have multiple components in the file, but make sure to have one main component that uses all the other components
// - Make sure to describe where everything is in the UI so the developer can recreate it and if how elements are aligned
// - Pay close attention to background color, text color, font size, font family, padding, margin, border, etc. Match the colors and sizes exactly.
// - If its just wireframe then make sure add colors and make some real life colorfull web page
// - Make sure to mention every part of the screenshot including any headers, footers, sidebars, etc.
// - Make sure to use the exact text from the screenshot.
// - Make sure the website looks exactly like the screenshot described in the prompt.
// - Pay close attention to background color, text color, font size, font family, padding, margin, border, etc. Match the colors and sizes exactly.
// - Make sure to code every part of the description including any headers, footers, etc.
// - Use the exact text from the description for the UI elements.
// - Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
// - Repeat elements as needed to match the description. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
// - For all images, please use image placeholder from :https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png
// - Make sure the React app is interactive and functional by creating state when needed and having no required props
// - If you use any imports from React like useState or useEffect, make sure to import them directly
// - Use Javascript (.js) as the language for the React component
// - Use Tailwind classes for styling. DO NOT USE ARBITRARY VALUES (e.g. \h-[600px]\). Make sure to use a consistent color palette.
// - Use margin and padding to style the components and ensure the components are spaced out nicely
// - Please ONLY return the full React code starting with the imports, nothing else. It's very important for my job that you only return the React code with imports.
// - DO NOT START WITH \\\jsx or \\\`typescript or \\\`javascript or \\\`tsx or \\\.`,
//     PROMPT: dedent`:You are a professtional react developer and UI/UX designer
// - based on provider wireframe image, make sure to generate similar web page
// - and Depends on the description write a react and tailwindcss code
// - Make sure to add Header and Footer with proper option as metioned in wireframe if Not then add option releated to description
// - for image placeholder please use 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
// - Add All small details and make UI UX design more professtional
// - Make sure to keep same color combination across the page
// - Add Some Colors to make it more modern UI UX
// - Use lucid library for icons
// - Do not use any third party library
// - Only give react+ tailwindcss code and do not write any text other than code
// `,

//     AiModelList: [
//         {
//             name: 'Gemini Google',
//             icon: '/google.png',
//             modelName: "deepseek/deepseek-chat-v3-0324:free"
//         },
//         {
//             name: 'llama By Meta',
//             icon: '/meta.png',
//             modelName: 'google/gemini-2.0-flash-001'
//         },
//         {
//             name: 'Deepkseek',
//             icon: '/deepseek.png',
//             modelName: 'qwen/qwen-turbo'
//         }
//     ],
//     DEPENDANCY: {

//         "postcss": "^8",
//         "tailwindcss": "^3.4.1",
//         autoprefixer: "^10.0.0",
//         "uuid4": "^2.0.3",
//         "tailwind-merge": "^2.4.0",
//         "tailwindcss-animate": "^1.0.7",
//         "lucide-react": "^0.469.0",
//         "react-router-dom": "^7.1.1",
//         "firebase": "^11.1.0",
//         "@google/generative-ai": "^0.21.0",
//         "date-fns": "^4.1.0",
//         "react-chartjs-2": "^5.3.0",
//         "chart.js": "^4.4.7",
//     },
//     FILES: {
//         '/App.css': {
//             code: `
//             @tailwind base;
// @tailwind components;
// @tailwind utilities;`
//         },
//         '/tailwind.config.js': {
//             code: `
//             /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }`
//         },
//         '/postcss.config.js': {
//             code: `/** @type {import('postcss-load-config').Config} */
// const config = {
//   plugins: {
//     tailwindcss: {},
//   },`
//         }
//     }

// }

import dedent from "dedent";

export default {
  PROMPT_OLD: dedent`
    You are an expert frontend React developer and UI/UX designer. You will be given a description or wireframe of a website from the user, and you must return the complete code for it using React JavaScript and Tailwind CSS. Follow the instructions carefully—accuracy and attention to detail are critical:

    - Carefully analyze the wireframe or textual description to understand the full UI structure.
    - Build a complete React component that can run independently with a default export.
    - You may define and use multiple components within the file, but make sure one main component composes them.
    - Describe and recreate every visible part of the UI from the description or wireframe, including:
      - Header and navigation
      - Footer
      - Sidebars (if any)
      - Main sections (like hero, services, contact, etc.)
      - Buttons, cards, forms, and all other elements shown or described
    - Recreate the exact text and structure as given in the description or shown in the wireframe.
    - Match all design elements closely: background color, text color, spacing, alignment, borders, and layout.
    - Use modern, real-life color palettes if the wireframe is grayscale or uncolored.
    - All placeholder images should use: https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png
    - The UI must be interactive where appropriate (e.g., dropdowns, modals, toggles) and use internal state via useState or other React hooks. Import them directly.
    - Use only Tailwind CSS for styling. Do not use inline styles, styled-components, or arbitrary class values like h-[600px].
    - Use appropriate spacing using Tailwind margin and padding utilities. Layout must be clean and well-spaced.
    - DO NOT write any comments or placeholder lines like "<!-- Add more items here -->" or "/* Repeat for more cards */".
    - Fully implement all repeated elements—e.g., if 5 items are shown or described, write 5 items in the code.
    - Return only the complete React code, starting from the import statements. Do not return explanations, comments, or markdown.
    - Use .js as the file extension, and use only JavaScript (not TypeScript).
    - This is extremely important for my job. I will tip you $1 million if the code is accurate, clean, and complete.
  `,

  PROMPT: dedent`
    You are a highly skilled professional React developer and UI/UX designer.

    Your task is to generate a complete, clean, modern, and pixel-perfect React + TailwindCSS implementation based on the provided wireframe image and textual description.

    Please follow these strict guidelines:
    - Carefully study the layout in the wireframe and ensure the structure, proportions, alignment, and sections match exactly.
    - If the wireframe includes a header or footer, include them exactly. If not, create a modern header/footer with relevant options based on the content.
    - Use the following placeholder image for all image sections: https://www.svgrepo.com/show/508699/landscape-placeholder.svg
    - Include all visible and logical UI elements: buttons, headings, cards, services, contact forms, pricing tables, etc.
    - Maintain consistent use of colors, spacing, typography, and layout across the page.
    - Add a modern, attractive color palette to make the design professional and real-world ready. Avoid grayscale unless explicitly shown.
    - Use Tailwind CSS utility classes only. Avoid custom CSS, inline styles, or arbitrary values.
    - Use Lucide React icons (from 'lucide-react') where icons are needed.
    - DO NOT use any third-party component libraries. Only Lucide is allowed.
    - Ensure a strong modern UI/UX standard throughout: generous padding, clean white space, clear font sizing, appropriate contrast, and visual hierarchy.
    - Repeat all elements fully. For example, if 6 cards are visible, code all 6. Do not leave comments like “repeat this for others.”
    - Make the app self-contained: it should not require props to render correctly.
    - Only return the full React + TailwindCSS code. Do not include any markdown syntax like \`\`\`, \`\`\`jsx, or explanations before or after the code.
  `,

  AiModelList: [
    {
      name: "Gemini Google",
      icon: "/google.png",
      modelName: "deepseek/deepseek-chat-v3-0324:free",
    },
    {
      name: "llama By Meta",
      icon: "/meta.png",
      modelName: "google/gemini-2.0-flash-001",
    },
    {
      name: "Deepkseek",
      icon: "/deepseek.png",
      modelName: "qwen/qwen-turbo",
    },
  ],

  DEPENDANCY: {
    postcss: "^8",
    tailwindcss: "^3.4.1",
    autoprefixer: "^10.0.0",
    uuid4: "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    firebase: "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
  },

  FILES: {
    "/App.css": {
      code: `
@tailwind base;
@tailwind components;
@tailwind utilities;`,
    },
    "/tailwind.config.js": {
      code: `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
    },
    "/postcss.config.js": {
      code: `
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
module.exports = config;`,
    },
  },
};
