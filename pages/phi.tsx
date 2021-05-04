import { useState } from 'react';
import Main from '@templates/Main';
import { Card, Form, InputNumber, Button } from 'antd';
import { phi } from '@utils/index';

const Home = () => {
  const [result, setResult] = useState<string | null>(null);
  const breadCrumb = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Φ (Phi)', href: '/phi' },
  ];
  const onFinish = (values: any) => {
    const result = phi(values.phi);
    setResult(result);
  };

  return (
    <Main breadCrumb={breadCrumb} defaultSelectedKeys={['4']}>
      <Card title="Φ (Phi)">
        <Form
          name="gcd"
          layout="inline"
          onFinish={onFinish}
          initialValues={{ phi: 1 }}
        >
          <Form.Item
            label="Φ (phi)"
            name="phi"
            rules={[{ required: true, message: 'Vui lòng nhập số Φ!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Giải
            </Button>
          </Form.Item>
        </Form>
        <div
          style={{ marginTop: 30 }}
          dangerouslySetInnerHTML={{ __html: result as string }}
        ></div>
      </Card>
    </Main>
  );
};

export default Home;
