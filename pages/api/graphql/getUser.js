import { gql } from '@apollo/client'
import client from '../../../apollo/apollo-client'

export default async (req, res) => {
  const email = req.body.email

  try {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          queryUser(filter: {email: {alloftext: "${email}"}}) {
            email
            image
            username
          }
        }
      `
    })

    if (data.queryUser.length <= 0) {
      res.status(400).send({
        data: { queryUser: [] }
      })
    } else {
      res.status(200).send({ data })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}
