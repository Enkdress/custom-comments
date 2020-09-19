import { Modal, Form, Input, Button, message } from 'antd';

export default function SignIn({ haveToLogIn, setHaveToLogIn }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('username', e.target.username.value)
    message.success('Congratulations you are now sign in');
    message.info('Please try again sending your message');

    setHaveToLogIn(false);
  };

  return (
    <Modal width={300} footer={null} title="Sign In" onCancel={() => setHaveToLogIn(false)} visible={haveToLogIn}>
      <Form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} onSubmitCapture={handleSubmit}>
        <Form.Item label="User name" labelAlign="left" required>
          <Input id="username" name="username" autoFocus />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>GO...</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
