import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class Minuba implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'Minuba',
		name: 'Minuba',
		icon: 'file:nasa.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Minuba API for data processing and analytics',
		defaults: {
			name: 'Minuba',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'MinubaApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://app.minuba.dk/api',
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
						name: 'Data Processing',
						value: 'dataProcessing',
					},
					{
						name: 'Analytics',
						value: 'analytics',
					},
				],
				default: 'dataProcessing',
			},
			// Operations will go here
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'dataProcessing',
						],
					},
				},
				options: [
					{
						name: 'Process',
						value: 'process',
						action: 'Process data with Minuba',
						description: 'Process data using Minuba services',
						routing: {
							request: {
								method: 'POST',
								url: '/process',
							},
						},
					},
				],
				default: 'process',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'analytics',
						],
					},
				},
				options: [
					{
						name: 'Analyze',
						value: 'analyze',
						action: 'Analyze data with Minuba',
						description: 'Get analytics from Minuba',
						routing: {
							request: {
								method: 'GET',
								url: '/analytics',
							},
						},
					},
				],
				default: 'analyze',
			},
			{
				displayName: 'Dataset ID',
				description: 'The ID of the dataset to process',
				required: true,
				name: 'datasetId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'dataProcessing',
						],
					},
				},
				routing: {
					request: {
						body: {
							datasetId: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Analysis Type',
				description: 'Type of analysis to perform',
				required: true,
				name: 'analysisType',
				type: 'options',
				options: [
					{name: 'Trend Analysis', value: 'trend'},
					{name: 'Pattern Recognition', value: 'pattern'},
					{name: 'Predictive Modeling', value: 'predictive'},
					{name: 'Statistical Analysis', value: 'statistical'},
				],
				routing: {
					request: {
						qs: {
							type: '={{$value}}',
						},
					},
				},
				default: 'trend',
				displayOptions: {
					show: {
						resource: [
							'analytics',
						],
					},
				},
			},
			// Optional/additional fields will go here
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: [
							'dataProcessing',
						],
						operation: [
							'process',
						],
					},
				},
				options: [
					{
						displayName: 'Processing Options',
						name: 'processingOptions',
						type: 'string',
						default: '',
						description: 'Additional processing options in JSON format',
						routing: {
							request: {
								body: {
									options: '={{$value}}',
								},
							},
						},
					},
				],									
			}
		]
	};
}