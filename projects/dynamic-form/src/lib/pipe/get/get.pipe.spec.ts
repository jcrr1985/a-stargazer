import { GetPipe } from './get.pipe';

describe('GetPipe', () => {
  let pipe: GetPipe;

  beforeEach(() => {
    pipe = new GetPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should get value from object with valid path', () => {
    const input = { user: { name: 'John' } };
    const path = 'user.name';

    const result = pipe.transform(input, path);

    expect(result).toEqual('John');
  });

  it('should return defaultValue for invalid path', () => {
    const input = { user: { name: 'John' } };
    const path = 'user.address.city';
    const defaultValue = 'Unknown';

    const result = pipe.transform(input, path, defaultValue);

    expect(result).toEqual(defaultValue);
  });

  it('should return defaultValue for undefined input', () => {
    const input = undefined;
    const path = 'user.name';
    const defaultValue = 'Unknown';

    const result = pipe.transform(input, path, defaultValue);

    expect(result).toEqual(defaultValue);
  });

  it('should return defaultValue for null input', () => {
    const input = null;
    const path = 'user.name';
    const defaultValue = 'Unknown';

    const result = pipe.transform(input, path, defaultValue);

    expect(result).toEqual(defaultValue);
  });
});
