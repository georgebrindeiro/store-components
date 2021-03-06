import React from 'react'
import { render, wait } from '@vtex/test-tools/react'

import orderFormQuery from '../../components/Greeting/queries/orderForm.gql'
import Greeting from '../../Greeting'

const mocks = [
  {
    request: {
      query: orderFormQuery,
    },
    result: {
      data: {
        minicart: {
          orderForm: '{ "clientProfileData": { "firstName": "Adam" } }',
        },
      },
    },
  },
]

describe('<Greeting /> component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  const renderComponent = customProps => {
    const props = {
      ...customProps,
    }

    return render(<Greeting {...props} />, { graphql: { mocks } })
  }

  it('should render name in orderForm', async () => {
    const { getByText } = renderComponent()
    await wait(() => {
      jest.runAllTimers()
    })
    getByText('Adam')
  })

  // eslint-disable-next-line jest/no-identical-title
  it('should render name in orderForm', async () => {
    const { getByTestId } = renderComponent({ loading: true })
    await wait(() => {
      jest.runAllTimers()
    })
    getByTestId('greeting-loader')
  })
})
