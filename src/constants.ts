export const constants = {
    url : process.env.NODE_ENV === "development" 
    ? "http://localhost:3000"
    : " https://e-commerce-app-flax-tau.vercel.app/"
    ,
    paymentLinks : {
        purchase : 
            process.env.NODE_ENV === "development"
            ? "https://buy.stripe.com/test_28o9DAcTv6MJ3PG144"
            : "",
    }
}