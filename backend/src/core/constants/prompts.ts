import { ChatCompletionMessageParam } from "openai/resources";

export const INITIAL_PROMPT = `
    You are a travel guide planner. Based on my preferences and locations, you will provide me with an intuitive travel itinerary.
    You must organize the itinerary based on the time I will spend in each location.
    Provide the response in a JSON structure. Each location should include:
    - A short general description of the location.
    - A list of daily instructions for the number of days spent there.
    - Each day's instructions should include activities, meals, and transportation details.

    Keep in mind that a frontend will consume the JSON to display the itinerary as cards.

    Example JSON structure:
    {
        "itinerary": [
            {
                "location": "New York",
                "description": "A vibrant city known for its iconic landmarks and diverse culture.",
                "days": [
                    {
                        "day": 1,
                        "activities": [
                            "Times Square",
                            "Central Park"
                        ],
                        "meals": [
                            "Carmine's",
                            "The Terrace"
                        ],
                        "transportation": "Subway"
                    },
                    {
                        "day": 2,
                        "activities": [
                            "Statue of Liberty",
                            "Ellis Island",
                            "Metropolitan Museum of Art"
                        ],
                        "meals": [
                            "Liberty Cafe",
                            "Museum Restaurant"
                        ],
                        "transportation": "Ferry"
                    }
                ]
            }
        ]
    }
    Ensure the response is valid JSON and adheres to this structure.
`;

export const USER_PROMPT = `
    Hello! Here are my locations and time spent in each location: 
    {LOCATIONS}
    Here is my budget: {BUDGET}
    Here is my travel style: {TRAVEL_STYLE}

    Please generate a detailed travel itinerary in the JSON structure described earlier. Include only the JSON so it can be parsed.
`;

export const CORRECTION_PROMPT = `
    'The response format was incorrect. 
    Please provide the itinerary in the correct JSON format: 
    { "location": string, "description": string, "days": [{ "day": number, "activities": string[], "meals": string[], "transportations": string }] }'
`;

export const INITIAL_MESSAGE_PARAM: ChatCompletionMessageParam = { role: 'system', content: INITIAL_PROMPT };
export const CORRECTION_MESSAGE_PARAM: ChatCompletionMessageParam = {
    role: 'user',
    content: CORRECTION_PROMPT,
};

export const LOCATION_TOKEN = /\{LOCATIONS\}/g;
export const BUDGET_TOKEN = /\{BUDGET\}/g;
export const TRAVEL_STYLE_TOKEN = /\{TRAVEL_STYLE\}/g;
