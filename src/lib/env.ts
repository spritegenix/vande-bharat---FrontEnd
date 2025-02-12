class Env {
    static BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL as string;
    static API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;
    static RAZORPAY_API_KEY: string = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY as string;
    static REVALIDATE_TIME = process.env.NEXT_PUBLIC_REVALIDATE_TIME || 3600 as number;
}

export default Env;