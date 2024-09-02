const { NodeSDK } = require('@opentelemetry/sdk-node')
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node')
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http')
const { Resource } = require('@opentelemetry/resources')
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-node')

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'next-app',
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter({
    url: 'https://otlp.nr-data.net',
    headers: {
      'api-key': process.env.NEW_RELIC_API_KEY
    }
  })),
  instrumentations: [getNodeAutoInstrumentations()]
})
sdk.start()
