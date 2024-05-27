import reducer, { fetchBirths, BithdatesFetchStatus, month, day } from './birthsSlice'

describe('birthsSlice', () => {
  const birthdateList = [
    { year: '2000', text: 'John Doe' },
    { year: '1998', text: 'John Smith' }
  ]

  describe('births extraReducers', () => {
    const initialState = {
      value: {
        births: [],
        status: undefined,
        error: undefined
      }
    }

    it('sets status loading when fetchBirths is pending', () => {
      const action = { type: fetchBirths.pending.type }
      const state = reducer(initialState, action)
      expect(state).toEqual({ value: { births: [], status: BithdatesFetchStatus.Loading, error: undefined, } })
    })

    it('sets status success and births eith data when fetchBirths is fulfilled', () => {
      const action = { type: fetchBirths.fulfilled.type, payload: { births: birthdateList } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ value: { births: birthdateList, status: BithdatesFetchStatus.Success, error: undefined } })
    })

    it('sets status failed when fetchBirths is rejected', () => {
      const action = { type: fetchBirths.rejected.type, error: { message: 'some error' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ value: { births: [], status: BithdatesFetchStatus.Failed, error: 'some error', } })
    })
  })

  describe('fetchBirths', () => {
    let promiseProps = {
      ok: true,
      status: 200,
      json: () => Promise.resolve({ births: birthdateList })
    }

    global.fetch = jest.fn(() => Promise.resolve(promiseProps)) as jest.Mock

    describe('with no status error', () => {
      it('fetches births data correctly', async () => {
        const action = await fetchBirths()(jest.fn(), jest.fn(), undefined)

        expect(global.fetch).toHaveBeenCalledWith(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`)
        expect(action.payload).toEqual({ births: birthdateList })
      })
    })

    describe('with status error 500', () => {
      beforeEach(async () => {
        promiseProps = {
          ok: false,
          status: 500,
          json: () => Promise.resolve({ births: birthdateList })
        }
      })

      it('fetches births data and return error', async () => {
        const action = await fetchBirths()(jest.fn(), jest.fn(), undefined)

        expect(global.fetch).toHaveBeenCalledWith(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`)
        expect(action.payload).toEqual(Error('Sorry, server encountered an unexpected problem'))
      })
    })
  })
})
