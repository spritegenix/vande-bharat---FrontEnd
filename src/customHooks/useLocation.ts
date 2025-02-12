import { useState, useEffect } from "react";
import axios from "axios";

const LOCATIONIQ_API_KEY = "YOUR_LOCATIONIQ_API_KEY"; // Replace with your API key

export function useLocation() {
    const [location, setLocation] = useState({ city: "", state: "", country: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchLocation() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        try {
                            const res = await axios.get(
                                `https://us1.locationiq.com/v1/reverse.php?key=${LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
                            );
                            const data = res.data.address;
                            setLocation({
                                city: data.city || data.town || "",
                                state: data.state || "",
                                country: data.country || ""
                            });
                        } catch (error) {
                            console.error("GPS location error:", error);
                            getIpLocation(); // Fallback if API fails
                        }
                    },
                    (error) => {
                        console.warn("GPS permission denied:", error.message);
                        getIpLocation(); // Fallback if permission is denied
                    }
                );
            } else {
                console.warn("Geolocation not supported, using IP-based location.");
                getIpLocation();
            }
        }

        // 🌍 Get IP-based location (Fallback)
        async function getIpLocation() {
            try {
                const res = await axios.get("https://ipapi.co/json/");
                const data = res.data;
                setLocation({
                    city: data.city || "",
                    state: data.region || "",
                    country: data.country_name || ""
                });
            } catch (error) {
                console.error("IP-based location error:", error);
                setError("Unable to determine location.");
            }
            setLoading(false);
        }

        fetchLocation();
    }, []);

    return { location, loading, error };
}
