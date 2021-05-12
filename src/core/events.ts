export const events = [
  'load',
  'onboard',
  'register',
  'bank_list',
  'bank_not_found',
  'bank_selected',
  'syncing',
  'complete',
  'back_finished',
  'back',
  'exit',
  'error',
] as const;

export type EventsConnect = typeof events[number]
