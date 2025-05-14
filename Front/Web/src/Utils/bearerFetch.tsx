import { useCookies } from 'react-cookie';

export const useBearerFetch = () => {
    const [cookies] = useCookies(['authorization']);

    const bearerFetch = (url: string, options: RequestInit = {}) => {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            Authorization: `${cookies.authorization}`,
        };

        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const fullUrl = `${apiUrl}${url}`;

        return fetch(fullUrl, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...(options.headers || {}),
            },
        });
    };

    return bearerFetch;
};
