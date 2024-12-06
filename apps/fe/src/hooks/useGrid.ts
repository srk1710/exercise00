
export const useGrid = () => {

    const fetchGridWithCode = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/grid-code");
            if (!response.ok) {
                throw new Error("Failed to fetch grid and code");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching grid and code:", error);
            throw error;
        }
    };

    const fetchGrid = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/grid");
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

    return { fetchGridWithCode, fetchGrid };
};



