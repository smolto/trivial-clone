import { gql } from '@apollo/client'
import client from '../../../apollo/apollo-client'

export default async (req, res) => {
  const username = req.body.username
  const email = req.body.email
  const image = req.body.image

  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation MyMutation {
          updateUser(
            input: {
              filter: { email: { alloftext: "${email}" } }
              set: { email: "${email}", image: "${image}", username: "${username}" }
            }
          ) {
            numUids
          }
        }
      `
    })

    res.send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}
