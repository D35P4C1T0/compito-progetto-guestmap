import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import avatar from './media/matt.jpg'

const DummyComments = () => (
  <Comment.Group className='commentsBox'>
    <Comment>
      <Comment.Avatar src={avatar} />
      <Comment.Content>
        <Comment.Author as='a'>Alvaro</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>N'è male come posto eh!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar src={avatar} />
      <Comment.Content>
        <Comment.Author as='a'>Kung Fu</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>Ottimo kebab, tornerei volentieri</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment>
        <Comment.Avatar src={avatar} />
        <Comment.Content>
          <Comment.Author as='a'>Gerri Scotti</Comment.Author>
          <Comment.Metadata>
            <div>Just now</div>
          </Comment.Metadata>
          <Comment.Text>Uno dei borghi più belli d'Italia</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </Comment>

    <Comment>
      <Comment.Avatar src={avatar} />
      <Comment.Content>
        <Comment.Author as='a'>Joe Rogan</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>Camerieri simpatici e ottima varietá</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply>
      <Form.TextArea />

      <Button
        className='submitCommentButton'
        content='Add Reply'
        labelPosition='left'
        icon='edit'
      />
    </Form>
  </Comment.Group>
)

export default DummyComments
