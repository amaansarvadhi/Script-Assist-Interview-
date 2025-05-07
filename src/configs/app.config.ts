export type AppConfig = {
    apiPrefix: string
    loginPrefix : string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix:import.meta.env.VITE_API_PREFIX,
    loginPrefix : import.meta.env.VITE_LOGIN_PREFIX,
    authenticatedEntryPath: '/',
    unAuthenticatedEntryPath: '/login',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
