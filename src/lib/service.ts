import { ServiceProvider } from './ServiceProvider';
import { AllServices, ServiceName, ServiceOptions } from './types';
import { getCredentials } from './utils';

export class Service extends ServiceProvider {
  // @ts-expect-error All fields don't need to be set here
  private cachedClients: Record<ServiceName, AllServices> = {};

  protected options: ServiceOptions;

  constructor(options: ServiceOptions) {
    super();

    this.options = options;
  }

  protected get callHeaders(): Record<string, string> {
    throw new Error('Method not implemented.');
  }

  protected loadService<T = AllServices>(serviceName: ServiceName): T {
    if (this.cachedClients[serviceName])
      return this.cachedClients[serviceName] as T;

    const { [serviceName]: ProtoService } = require('google-ads-node');

    const credentials = getCredentials(this.options.auth);

    const client = new ProtoService({
      sslCreds: credentials,
    });

    this.cachedClients[serviceName] = client;

    return client;
  }
}
