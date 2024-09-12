import { createGetKcContext } from "keycloakify/login";

export type KcContextExtension = { pageId: "login.ftl" };

export const { getKcContext } = createGetKcContext<KcContextExtension>({
    mockData: [
        {
            pageId: "login.ftl",
            realm: {
                name: "fgic",
                displayName: 'fgic'
            },
            // message: {type: 'success', summary: 'Please specify username or email.'},
            social: {
                providers: [
                    {
                        providerId: "google",
                        displayName: "google",
                        loginUrl: "bla",
                        alias: "google",
                    },
                    {
                        providerId: "linkedin",
                        displayName: "linkedin",
                        loginUrl: "bla",
                        alias: "linkedin",
                    },
                    {
                        providerId: "facebook",
                        displayName: "facebook",
                        loginUrl: "bla",
                        alias: "facebook",
                    },
                    {
                        providerId: "github",
                        displayName: "github",
                        loginUrl: "bla",
                        alias: "github",
                    },
                    {
                        providerId: "UAE Pass",
                        displayName: "UAE Pass",
                        loginUrl: "bla",
                        alias: "UAE Pass",
                    },
                ],
            },
            locale: {
                currentLanguageTag: "en",
            },
        },
        {
            pageId: "login-reset-password.ftl",
            locale: {
                currentLanguageTag: "en",
            },
        },
        {
            pageId: "login-update-password.ftl",
            locale: {
                currentLanguageTag: "en",
            },
        },
        {
            pageId: "login-otp.ftl",

            otpLogin: {
                userOtpCredentials: [
                    { userLabel: "S20" },
                    { userLabel: "Realme 5" },
                ],
            },
        },
    ],
    // Defined in vite.config.ts
    // See: https://docs.keycloakify.dev/environnement-variables
    mockProperties: {
        MY_ENV_VARIABLE: "Mocked value",
    },
});

export const { kcContext } = getKcContext({
    // Uncomment to test the login page for development.
    //mockPageId: "login.ftl",
});

export type KcContext = NonNullable<
    ReturnType<typeof getKcContext>["kcContext"]
>;
