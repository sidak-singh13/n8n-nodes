import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MinubaApi implements ICredentialType {
	name = 'MinubaApi';
	displayName = 'Minuba API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://docs.minuba.com/api/authentication';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
	authenticate = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': 'Bearer {{$credentials.apiKey}}'
			}
		},
	} as IAuthenticateGeneric;
}