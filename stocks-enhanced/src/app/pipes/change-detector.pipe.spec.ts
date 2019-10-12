import { ChangeDetectorPipe } from './change-detector.pipe';

describe('ChangeDetectorPipe', () => {
  it('create an instance', () => {
    const pipe = new ChangeDetectorPipe();
    expect(pipe).toBeTruthy();
  });
});
