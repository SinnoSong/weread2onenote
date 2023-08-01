export const environment = {
    production: false,
    msalConfig: {
        auth: {
            clientId: '0d406e53-4109-4512-b61c-a8416054cbec',
            authority: 'https://login.microsoftonline.com/consumers'
        }
    },
    apiConfig: {
        scopes: ['user.read', 'Notes.ReadWrite'],
        uri: 'https://graph.microsoft.com/v1.0/me'
    }
};
