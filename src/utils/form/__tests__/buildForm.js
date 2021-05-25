jest.mock('form-data')
const { buildForm } = require('../')
const { pickKeys, omitKeys } = require('@keg-hub/jsutils')

describe('buildForm', () => {
  it('should build a form object from the entries', () => {
    const obj = {
      a: 'foo',
      b: 'bar' 
    }
    const form = buildForm(obj)

    expect(form).toEqual(obj)
  })

  it('should serialize the metadata field as a note', () => {
    const obj = {
      a: 'foo',
      b: 'bar',
      meta: {
        baz: 'boom'
      }
    }

    const form = buildForm(obj)

    expect(form).toEqual({
      ...pickKeys(obj, ['a', 'b']),
      note: JSON.stringify(obj.meta)
    })

  })

  it('should use the note entry before metadata', () => {
    const obj = {
      a: 'foo',
      b: 'bar',
      note: 'wow',
      meta: {
        baz: 'boom'
      }
    }

    const form = buildForm(obj)

    expect(form).toEqual(
      omitKeys(obj, ['meta'])
    )
  })
})