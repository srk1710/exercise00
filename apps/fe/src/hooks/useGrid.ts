export const useGrid = () => {

    const fetchGrid = async (withCode: boolean = false) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/grid?withCode=${withCode}`
            );
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
