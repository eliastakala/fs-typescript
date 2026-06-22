import axios from 'axios'
import type { Entry, NewEntry } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async () => {
  const response = await axios
        .get<Entry[]>(baseUrl)
    return response.data
}

const create = async (object: NewEntry) => {
  const response = await axios
        .post<Entry>(baseUrl, object)
    return response.data
}

export default { getAll, create }