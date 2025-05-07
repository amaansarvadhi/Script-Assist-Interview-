export type SignInCredential = {
    password: string
    username: string
}

export type SignInResponse = {
    accessToken: string
    user: {
        username: string
        authority: string[]
        avatar: string
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    username: string
    password: string
}

export type ForgotPassword = {
    username: string
}

export type ResetPassword = {
    password: string
}
