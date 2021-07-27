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
          addUser(input: { username: "${username}", email: "${email}", image: "${image}" }) {
            numUids
          }
        }
      `
    })

    res.send(data)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}
