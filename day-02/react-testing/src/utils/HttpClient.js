export default class HttpClient {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async get(url) {
        let response = await fetch(`${this.baseUrl}${url}`);

        await HttpClient.handleError(response);

        return await response.json();
    }

    async post(url, data) {
        let response = await fetch(`${this.baseUrl}${url}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            referrer: "no-referrer",
            body: JSON.stringify(data),
        });

        await HttpClient.handleError(response);

        let json = await response.text();

        if (!json || json.length === 0) {
            return null;
        }

        return JSON.parse(json);
    }

    static async handleError(response) {
        if (!response.ok) {
            console.error(`HTTP Request Failed: ${response.statusText}
            Body:
                ${await response.text()}
            `);

            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
    }
}
