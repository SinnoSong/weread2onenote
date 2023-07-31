import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { DeviceCodeCredential } from "@azure/identity"
import { Client } from "@microsoft/microsoft-graph-client";

const credential = new DeviceCodeCredential({
    tenantId: 'f417c65a-8b26-4480-a2df-18e45b46baeb',
    clientId: 'df66edbc-5c89-478f-a546-c03335dbf830',
    userPromptCallback: (info) => {
        console.log(info.message);
    },
});

const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ['User.Read'],
});

const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
export default graphClient;