const apiUrl = process.env.REACT_APP_API_URL;

export const useGrid = () => {
    const fetchGrid = async (withCode: boolean = false, biasChar?: string) => {
        try {
            const query = new URLSearchParams();
            query.append("withCode", String(withCode));
            if (biasChar) {
                query.append("biasChar", biasChar);
            }

            const response = await fetch(`${apiUrl}/api/grid?${query.toString()}`);
            if (!response.ok) {
                throw new Error("Failed to fetch grid");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching grid:", error);
            throw error;
        }
    };

    return { fetchGrid };
};
