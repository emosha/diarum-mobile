import mapFieldValues from '../../utils/mapFieldValues';

describe('mapFieldValues', () => {
  it('correctly maps values for an array of fields', () => {
    const fields = ['name', 'email', 'age'];
    const result = mapFieldValues(fields, true);

    expect(result).toEqual({
      name: true,
      email: true,
      age: true,
    });
  });
});
