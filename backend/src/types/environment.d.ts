declare global {
    namespace NodeJS {
        /**
         * Define schema for environment variables
         */
        interface ProcessEnv {
            MONGO_URL: string;
            MONGO_TEST_URI: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            PUBLIC_API_URL: string;
            PUBLIC_API_GRAPHQL_URL: string;
            PETERPORTAL_MAIN_ES: string;
            MONGO_URI: string;
            PPAPI_KEY: string;
            SESSION_SECRET: string;
            GOOGLE_CLIENT: string;
            GOOGLE_SECRET: string;
            PRODUCTION_DOMAIN: string;
            GITHUB_ADMIN_USERNAMES: string;
            ADMIN_EMAILS: string;
            SALT_WORK_FACTOR: number;
            SENDGRID_API_KEY: string;
        }
    }
}

// need to export something to be considered a 'module'
export {}