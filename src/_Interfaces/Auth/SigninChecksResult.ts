export interface SigninChecksResult {
    redirectRequired: boolean,
    permissionsMissing: boolean,
    permissionsMessage: string,
    userData: UserCookie | null
}