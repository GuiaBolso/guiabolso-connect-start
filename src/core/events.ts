export const events = [
  'load',
  'onboard',
  'signup',
  'bank_list',
  'find_my_bank',
  'bank_selected',
  'bank_offline',
  'synced',
  'complete',
  'back',
  'exit',
  'error',
] as const;

export type EventsConnectKeys = typeof events[number];
