declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            URL_DATABASE: string
        }
    }
}

export { };