import { BirthdateData } from './birthdateDataLoader'
import { cleanup, render, screen } from '@testing-library/react'
import { BithdatesFetchStatus } from '@/lib/features/birthsSlice'
import StoreProvider from '@/app/storeProvider'
import '@testing-library/jest-dom'

afterEach(cleanup)

describe('BirthdateData', () => {
  it('show loader', () => {
    render(
      <StoreProvider>
        <BirthdateData
          birthsListState={BithdatesFetchStatus.Loading}
          birthsList={[]}
          birthsListError={undefined}
        />
      </StoreProvider>
    )

    expect(document.querySelector('.loader')).toBeTruthy()
  })

  it('show births list', () => {
    const birthsList = [
      { year: '2000', text: 'Some text' },
      { year: '1990', text: 'Another text' }
    ]

    render(
      <StoreProvider>
        <BirthdateData
          birthsListState={BithdatesFetchStatus.Success}
          birthsList={birthsList}
          birthsListError={undefined}
        />
      </StoreProvider>
    )

    expect(screen.getByText(birthsList[0].text)).toBeTruthy()
    expect(screen.getByText(birthsList[1].text)).toBeTruthy()
    expect(screen.getByText(birthsList[0].year)).toBeTruthy()
    expect(screen.getByText(birthsList[1].year)).toBeTruthy()
  })

  it('show error', () => {
    const birthsListError = 'Unexpected error'

    render(
      <StoreProvider>
        <BirthdateData
          birthsListState={BithdatesFetchStatus.Failed}
          birthsList={[]}
          birthsListError={birthsListError}
        />
      </StoreProvider>
    )

    expect(screen.getByText(`Error: ${birthsListError}`)).toBeTruthy()
  })
})
