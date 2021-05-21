import { observer } from './observer';

describe('observer', () => {
  const iframe = document.createElement('iframe');
  document.body.appendChild(iframe);

  it('should listen to the event', (done) => {
    const mockOnEmmiter = jest.fn();
    const mockPayload = { test: 123 };
    const mockMessage = {
      eventName: 'complete',
      payload: mockPayload,
    };

    setTimeout(() => iframe.contentWindow?.postMessage(mockMessage, '*'));

    const connect = observer({
      domain: '',
      onEmmiter: (...args) => {
        mockOnEmmiter();
        mockOnEmmiter.mockReturnValue(...args);
      },
      window: iframe.contentWindow,
    });

    connect.on('complete', (payload: any) => {
      expect(payload).toEqual(mockPayload);
      expect(mockOnEmmiter).toHaveBeenCalled();
      expect(mockOnEmmiter()).toEqual(mockMessage);

      connect.destroy();

      done();
    });
  });
});
