import { SagaIterator } from 'redux-saga'
import { all, call } from 'redux-saga/effects'

// Import Sagas to use here

export default function* rootSaga(): SagaIterator<void> {
  yield all([])
}
