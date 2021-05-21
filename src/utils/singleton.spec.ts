import { setInstanceValue, getInstance, destroyInstances } from './singleton';

describe('singleton', () => {
  it('access instances', () => {
    const mockTest = { test: [() => {}] };

    setInstanceValue('observer', mockTest);

    expect(getInstance('observer')).toEqual(mockTest);
  });

  it('destroy', () => {
    destroyInstances();

    expect(getInstance('observer')).toBeUndefined();
  });

  it('force get instance', () => {
    expect(getInstance('xpto' as 'isDestroyed')).toBeFalsy();
  });
});
