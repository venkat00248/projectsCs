/**
 * @description imports will declare here...
 */
import HttpApiService from "./HttpApiService";
import { config } from "../config/config";

//define the constants here...
const API_BASE = `${config.API.BASEURI}`;
const API = config.API;
const TICKET_TYPE_ENDPOINT = config.ENV.IS_PROD ||
    config.ENV.IS_UAT ? `${API_BASE}/${API.TICKET_TYPES.IS_GET ? 'list' : 'create'}/myshift_app/${API.TICKET_TYPES.ACTION}` :
    `${config.ENV.API_URL}/authorizeToken`;
/**
 * @description creates Ticket Type class and extends the HTTP interceptor class...
 */

export class AuthenticationService extends HttpApiService {
    constructor() {
        super(`${API_BASE}`);
    }

    /**
     * 
     * @param token 
     */
    validateToken = (token: string = "") => {
        try{
            return this.get(TICKET_TYPE_ENDPOINT,{
                params: {
                    token: token
                }
            })
        } catch (err) {
            throw err;
        }
    }


}

export const AuthenticateService = new AuthenticationService();

