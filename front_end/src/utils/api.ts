export const API_BASE_URL = "http://127.0.0.1:8001/api";

export const fetchAPI = async (
    url: string,
    method = "GET",
    body?: string
) => {
    const response = await fetch(`${API_BASE_URL}/${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return response.json();
};
