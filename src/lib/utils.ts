import { grpc } from 'google-gax';
import { errors, FAILURE_KEY } from './constants';

export const getCredentials = (authClient: grpc.OAuth2Client) => {
  const ssl = grpc.credentials.createSsl();

  const callCredentials =
    grpc.credentials.createFromGoogleCredential(authClient);

  const credentials = grpc.credentials.combineChannelCredentials(
    ssl,
    callCredentials,
  );

  return credentials;
};

export const getGoogleAdsError = (
  error: Error,
): errors.GoogleAdsFailure | Error => {
  // @ts-expect-error
  if (typeof error?.metadata?.internalRepr.get(FAILURE_KEY) === 'undefined') {
    return error;
  }

  // @ts-expect-error
  const [buffer] = error.metadata.internalRepr.get(FAILURE_KEY);

  return errors.GoogleAdsFailure.decode(buffer);
};