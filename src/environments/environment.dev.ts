export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '7dbdbe86-a32b-4f48-8477-531554f7fa53',
      authority: 'https://login.microsoftonline.com/consumers',
    },
  },
  apiConfig: {
    scopes: ['user.read', 'Notes.ReadWrite'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
};
