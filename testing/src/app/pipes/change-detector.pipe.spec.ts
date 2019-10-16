import { ChangeDetectorPipe } from './change-detector.pipe';

describe('ChangeDetectorPipe', () => {
  const pipe = new ChangeDetectorPipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should increment with each transform', () => {
    pipe.transform('');
    expect(pipe.count).toEqual(1);
    pipe.transform('');
    pipe.transform('');
    pipe.transform('');
    pipe.transform('');
    expect(pipe.count).toEqual(5);
  });
});
