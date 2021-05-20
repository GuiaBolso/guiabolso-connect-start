export const events = [
  'load',
  'onboard',
  'signup',
  'bank_list',
  'bank_not_found',
  'bank_selected',
  'bank_offline',
  'synced',
  'complete',
  'back',
  'exit',
  'error',
] as const;

export type EventsConnectKeys = typeof events[number];
