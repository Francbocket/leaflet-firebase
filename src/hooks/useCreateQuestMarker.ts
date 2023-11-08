import { FirebaseError } from 'firebase/app'
import { addDoc } from 'firebase/firestore'
import { useState } from 'react'
import { QuestMarkerType } from '../interfaces/types/questMarkerType'
import { questMarkersCollection } from '../services/firebaseDB'

export const useCreateQuestMarker = () => {
  const [queryState, setQueryState] = useState({
    loading: false,
    error: '',
  })

  const createQuestMarker = async (newQuest: QuestMarkerType) => {
    try {
      setQueryState({
        loading: true,
        error: '',
      })

      await addDoc(questMarkersCollection, newQuest)
    } catch (e) {
      const error = e as FirebaseError

      setQueryState({
        loading: false,
        error: error.message,
      })
    }
  }

  return {
    createQuestMarker,
    isQuestMarkCreating: queryState.loading,
    questMarkCreationError: queryState.error,
  }
}
