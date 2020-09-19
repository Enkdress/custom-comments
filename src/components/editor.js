import { Form, Input, Button } from 'antd';

export default function Editor({ onChange, onSubmit, submitting, value }) {
  return (
    <div>
      <Form.Item>
        <Input.TextArea autoFocus rows={2} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
          disabled={value ? false : true}
        >
          Add Comment
        </Button>
      </Form.Item>
    </div>
  );
}
