import {api} from "./api";

export const VotingSubmit = async (token: string, candidateId: number) => {
    const response = await api.post('/vote', {token: token, candidate_id: candidateId})

    return response.data
}