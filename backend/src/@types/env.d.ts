declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            URL_DATABASE: string;
            PASSWORD_JWT: string;
        }
    }
}

export { };