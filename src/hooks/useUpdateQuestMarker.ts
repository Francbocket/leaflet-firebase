import { FirebaseError } from 'firebase/app'
import { DocumentData, FieldValue, QueryDocumentSnapshot, runTransaction } from 'firebase/firestore'
import { useState } from 'react'
import { QuestMarkerType } from '../interfaces/types/questMarkerType'
import { firebaseDB } from '../services/firebaseDB'
import transformMarkerListToNestedObject from '../utils/transformMarkerListToNestedObject'

export const useUpdateQuestMarker = () => {
  const [queryState, setQueryState] = useState({
    loading: false,
    error: '',
  })

  const updateQuestMarker = async (
    questsList: QuestMarkerType[],
    questMarkerDoc: QueryDocumentSnapshot<QuestMarkerType, DocumentData>,
  ) => {
    try {
      setQueryState({
        loading: true,
        error: '',
      })

      const transformedData = transformMarkerListToNestedObject(questsList)

      await runTransaction(firebaseDB, async (transaction) => {
        transaction.update(questMarkerDoc.ref, transformedData as Record<string, FieldValue>)
      })

      setQueryState({
        loading: false,
        error: '',
      })
    } catch (e) {
      const error = e as FirebaseError

      setQueryState({
        loading: false,
        error: error.message,
      })
    }
  }

  return {
    updateQuestMarker,
    isQuestMarkUpdating: queryState.loading,
    questMarkUpdatingError: queryState.error,
  }
}
