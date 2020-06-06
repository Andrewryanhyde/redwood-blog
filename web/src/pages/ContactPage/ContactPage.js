import BlogLayout from 'src/layouts/BlogLayout'
import { Form, TextField, Submit, TextAreaField, FieldError, Label, useMutation } from '@redwoodjs/web'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const [createContact, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      alert('Thank you for your submission')
    }
  })

  const onSubmit = (data) => {
      createContact({ variables: { input: data } })
  }


  return (
    <BlogLayout>
      <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>
        {error && (
          <div style={{ color: 'red' }}>
            {"We couldn't send your message: "}
            {error.message}
          </div>
        )}
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField name="name" validation={{
          required: true
        }}
          errorClassName="error"
        />
        <FieldError name="name" className="error"/>

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField name="email" validation={{ required: true }} errorClassName="error"/>
        <FieldError name="email" className="error"/>


        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField name="message" validation={{ required: true }} errorClassName="error" />
        <FieldError name="message" className="error"/>

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
