import { beforeAll, describe, expect, it } from 'vitest';

import {
  MockService,
  MOCK_DEVELOPER_TOKEN,
  MOCK_OAUTH2_CLIENT,
} from './test-utils';
import { ads } from '../src';

let service: MockService;

const { GoogleAdsServiceClient } = ads.googleads.v17.services;

beforeAll(async () => {
  service = new MockService({
    auth: MOCK_OAUTH2_CLIENT,
    developer_token: MOCK_DEVELOPER_TOKEN,
  });
});

describe('Service', () => {
  it('should be able to create a service and load client', async () => {
    const client = service.loadService('GoogleAdsServiceClient');

    expect(client).toBeInstanceOf(GoogleAdsServiceClient);
  });

  it('should be loaded from cache', async () => {
    const client = service.loadService('GoogleAdsServiceClient');

    const cached = service.getCachedClient('GoogleAdsServiceClient');

    await Promise.all([
      expect(client).toBeInstanceOf(GoogleAdsServiceClient),
      expect(cached).toBeInstanceOf(GoogleAdsServiceClient),
    ]);
  });

  it('should be throw error if service not found', async () => {
    try {
      service.loadService('FooService');
    } catch (e: any) {
      expect(e.message).toBe('Service FooService not found.');
    }
  });
});

describe('callMetadata', () => {
  it('should be throw error', async () => {
    try {
      service.getCallMetadata();
    } catch (e: any) {
      expect(e.message).toBe('Not implemented');
    }
  });
});
