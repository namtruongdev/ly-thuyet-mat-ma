import { useState } from 'react';
import Main from '@templates/Main';
import { Card, Form, InputNumber, Button } from 'antd';

const Home = () => {
  const [result, setResult] = useState<string | null>(null);
  const breadCrumb = [
    { name: 'Trang chủ', href: '/' },
    { name: 'GCD (Thuật toán Euclid)', href: '/gcd' },
  ];

  const onFinish = (values: any) => {
    let result = ``;
    let R = 0;
    let A = values.A;
    let B = values.B;
    let I = 0;
    while (B > 0) {
      R = A % B;
      I = A / B;
      result += `<p>${A} = ${parseInt(`${I}`)} * ${B} + ${R}</p>`;
      A = B;
      B = R;
    }
    result += `<strong>Vậy GCD(${values.A}, ${values.B}) = ${A}</strong>`;
    setResult(result);
  };

  return (
    <Main breadCrumb={breadCrumb} defaultSelectedKeys={['3']}>
      <Card title="GCD (Thuật toán Euclid)">
        <Form
          name="gcd"
          layout="inline"
          onFinish={onFinish}
          initialValues={{ A: 1970, B: 1066 }}
        >
          <Form.Item
            label="GCD"
            name="A"
            rules={[{ required: true, message: 'Vui lòng nhập số A!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label=""
            name="B"
            rules={[{ required: true, message: 'Vui lòng nhập số B!' }]}
          >
            <InputNumber min={0} />
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
