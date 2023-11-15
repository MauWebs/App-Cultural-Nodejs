import axios from "axios";
import { HOST, PAYPAL_API, PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } from "../config/config.js";

export const createdOrder = async (req, res) => {

    // --------------------------------------------------------------------- //

    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: "100.00"
                }
            }
        ],
        application_context: {
            brandname: "App Cultural",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${HOST}/capture-order`,
            cancel_url: `${HOST}/cancel-order`
        }
    };

    // --------------------------------------------------------------------- //

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    try {
        const { data: { access_token } } = await axios.post(
            `${PAYPAL_API}/v1/oauth2/token`,
            params,
            {
                auth: {
                    username: PAYPAL_CLIENT_ID,
                    password: PAYPAL_SECRET_KEY
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

    // --------------------------------------------------------------------- //

        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        return res.json(response.data);

    // --------------------------------------------------------------------- //

    } catch (error) {

        console.error("Error in token request:", error.response ? error.response.data : error.message);

        return res.status(500).json({ error: "Internal Server Error" });

    };

};

// ------------------------------------------------------------------------- //

export const captureOrder = async (req, res) => {

    const { token } = req.query;

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {},
        {
            auth: {
                username: PAYPAL_CLIENT_ID,
                password: PAYPAL_SECRET_KEY
            },
        }
    );

    console.log(response.data);

    return res.send("Payed!");

};

// ------------------------------------------------------------------------- //

export const cancelOrder = (req, res) => res.send('Cancel Order!');