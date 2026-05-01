const ai = require("../../config/GeminiAI");
const { generateTextContent } = require("../../utils/geminiAi.util");

const GeneratePlatformInsight = async ({ totals, daily }) => {
    try {
        // if (process.env.NODE_ENV === "development") {
        //     return {
        //         success: true,
        //         value: "AI insights disabled in development mode",
        //     };
        // }

        const prompt = `
You are a senior SaaS analytics expert.

You are analyzing a clothing exchange marketplace platform called SWAPSTYLE.

Your job is to generate a HIGH LEVEL BUSINESS INSIGHT based on platform metrics.

-----------------------------------
DATA
-----------------------------------

TOTAL METRICS:
- Users: ${totals.users}
- Listings: ${totals.listings}
- Swaps: ${totals.swaps}
- Disputes: ${totals.disputes}

DAILY TREND SUMMARY (last 28 days):
Users: ${JSON.stringify(daily.users)}
Listings: ${JSON.stringify(daily.listings)}
Swaps: ${JSON.stringify(daily.swaps)}
Disputes: ${JSON.stringify(daily.disputes)}

-----------------------------------
YOUR TASK
-----------------------------------

Analyze this platform and return:

1. Overall platform health (1–2 lines)
2. Growth insight (users/listings/swaps trend)
3. Risk insight (disputes, drop-offs, or anomalies)
4. One actionable recommendation for improvement

-----------------------------------
RULES
-----------------------------------

- Be concise (max 120–160 words)
- No markdown
- No bullet points
- No JSON
- No formatting
- Only plain text
- Think like a startup CTO or product analyst

-----------------------------------
OUTPUT
-----------------------------------

Return ONLY the insight text.
`;

        const response = await generateTextContent(prompt);

        return {
            success: true,
            value: response,
        };
    } catch (err) {
        console.error("Error in GeneratePlatformInsight:", err);
        throw err;
    }
};

module.exports = { GeneratePlatformInsight };