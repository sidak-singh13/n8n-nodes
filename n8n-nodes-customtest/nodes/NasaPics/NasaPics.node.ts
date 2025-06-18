import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class NasaPics implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'Scalepoint',
		name: 'NasaPics',
		icon: 'file:nasa.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from ScalePoint API',
		defaults: {
			name: 'Scalepoint',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'NasaPicsApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://www.scalepoint.com/api/integration',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Case',
						value: 'case',
					},
				],
				default: 'case',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'case',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get case data',
						description: 'Get case information',
						routing: {
							request: {
								method: 'GET',
								url: '/={{$parameter["country"]}}/={{$parameter["tenant"]}}/={{$parameter["version"]}}/case',
							},
						},
					},
					{
						name: 'Create',
						value: 'create',
						action: 'Create a new case',
						description: 'Create a new case',
						routing: {
							request: {
								method: 'POST',
								url: '/={{$parameter["country"]}}/={{$parameter["tenant"]}}/={{$parameter["version"]}}/case',
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Country',
				description: 'The country code for the API',
				required: true,
				name: 'country',
				type: 'string',
				default: '',
				placeholder: 'US',
			},
			{
				displayName: 'Tenant',
				description: 'The tenant identifier',
				required: true,
				name: 'tenant',
				type: 'string',
				default: '',
				placeholder: 'tenant123',
			},
			{
				displayName: 'Version',
				description: 'API version',
				required: true,
				name: 'version',
				type: 'string',
				default: 'v1',
				placeholder: 'v1',
			},
			{
				displayName: 'Case ID',
				description: 'The case ID to retrieve',
				required: false,
				name: 'caseId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'case',
						],
						operation: [
							'get',
						],
					},
				},
				routing: {
					request: {
						url: '=/={{$parameter["country"]}}/={{$parameter["tenant"]}}/={{$parameter["version"]}}/case/{{$value}}',
					},
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: [
							'case',
						],
						operation: [
							'create',
						],
					},
				},
				options: [
					{
						displayName: 'Case Data',
						name: 'caseData',
						type: 'json',
						default: '{}',
						description: 'JSON data for the case',
						routing: {
							request: {
								body: '={{JSON.parse($value)}}',
							},
						},
					},
				],									
			}
		]
	};
}