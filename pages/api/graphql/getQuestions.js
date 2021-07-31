import { gql } from '@apollo/client'
import client from '../../../apollo/apollo-client'

export default async (req, res) => {
  const category = req.body.category
  try {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          queryQuestion(filter: { category: { allofterms: "${category}" } }) {
            answers
            correct
            question
            category
          }
        }
      `
    })

    if (data.queryQuestion.length === 0) {
      res.send({ data: [] })
    } else {
      res.send({ data: data.queryQuestion })
    }
  } catch (error) {
    res.send(error)
  }
}
