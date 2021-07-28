import { gql } from '@apollo/client'
import client from '../../../apollo/apollo-client'

export default async (req, res) => {
  // const user = req.body.user
  try {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          queryQuestions {
            answers
            correct
            difficulty
            question
          }
        }
      `
    })

    res.send({ data: data.queryQuestions })
  } catch (error) {
    res.send(error)
  }
}
