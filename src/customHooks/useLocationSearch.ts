import { useState } from "react";
import axios from "axios";

const LOCATIONIQ_API_KEY = "YOUR_LOCATIONIQ_API_KEY"; // Replace with your API key

export function useLocationSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // 🔍 Search locations with Autocomplete
    const searchLocation = async (searchQuery: any) => {
        setQuery(searchQuery);

        if (searchQuery.length < 2) {
            setResults([]); // Clear results if query is too short
            return;
        }

        setLoading(true);
        try {
            const res = await axios.get(
                `https://us1.locationiq.com/v1/autocomplete.php?key=${LOCATIONIQ_API_KEY}&q=${searchQuery}&format=json`
            );
            setResults(res.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setError("Error fetching locations.");
        }
        setLoading(false);
    };

    return { query, results, loading, error, searchLocation };
}
