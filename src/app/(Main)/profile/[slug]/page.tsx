"use client";
import CoverImage from "@/components/profile/CoverImage";
import ProfileCategory from "@/components/profile/ProfileCategory";
import { useCurrentUser } from "@/queries/user/user.queries";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";

export default function IndividualProfilePage() {
  const { getToken } = useAuth();
  const { data: user, isLoading, isError } = useCurrentUser();
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken({ template: "default" });
        console.log("JWT Token:", token);
      } catch (err) {
        console.error("Failed to get Clerk token:", err);
      }
    };

    fetchToken();
  }, [getToken]);

  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load user.</p>;
  console.log(user);


  return (
    <div>
      {JSON.stringify(user, null, 2)}
      {/* <CoverImage
        coverImage={"/images/profile/profile-cover.jpg"}
        profileImage={"/images/profile/profile-img.webp"}
        name={user?.firstName}
      />
      <ProfileCategory /> */}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function HealthCheck() {
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     axios("http://localhost:4000/api/v1/users/me")
//       .then((res) => {
//         setData(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.error("Health check failed:", err);
//         setError(true);
//       });
//   }, []);

//   if (error) return <p className="text-red-500">Failed to load{error}</p>;
//   if (!data) return <p>Loading...</p>;

//   return <pre>{JSON.stringify(data, null, 2)}</pre>;
// }
