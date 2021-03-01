import { useState } from 'react';
import Main from '@templates/Main';
import { Card, Form, Input, InputNumber, Button, Table } from 'antd';
import { MODULO26, MODULO26_ARRAY } from '@constants/index';

const Home = () => {
  const [columns, setColumns] = useState(undefined);
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [code, setcode] = useState<string | null>(null);
  const breadCrumb = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Mã dịch vòng (Shift Cipher)', href: '/' },
  ];

  const onFinish = (values: any) => {
    const textToArray = values.text.split('');

    const col = textToArray.map((value: string) => ({
      title: value,
      dataIndex: value,
      align: 'center',
    }));

    const dt = textToArray.reduce(
      (obj: any, current: string) => {
        obj[current] = MODULO26[current.toUpperCase()];
        return obj;
      },
      { key: 1 }
    );

    const addK = textToArray.reduce(
      (obj: any, current: string) => {
        obj[current] = MODULO26[current.toUpperCase()] + values.key;
        return obj;
      },
      { key: 2 }
    );

    let code = '';
    const encode = textToArray.reduce(
      (obj: any, current: string) => {
        const index =
          MODULO26[current.toUpperCase()] + values.key > 25
            ? MODULO26[current.toUpperCase()] + values.key - 26
            : MODULO26[current.toUpperCase()] + values.key;

        obj[current] = MODULO26_ARRAY[index];
        code += MODULO26_ARRAY[index];
        return obj;
      },
      { key: 3 }
    );

    setColumns(col);
    setData([dt, addK, encode]);
    setcode(code);
  };
  return (
    <Main breadCrumb={breadCrumb}>
      <Card title="Mã dịch vòng (Shift Cipher)">
        <Form name="shift-cipher" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Bản rõ"
            name="text"
            rules={[{ required: true, message: 'Vui lòng nhập bản rõ!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Khóa k"
            name="key"
            rules={[{ required: true, message: 'Vui lòng nhập khóa k!' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Mã Hóa
            </Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
          footer={() => (
            <p>
              Vậy bản mã nhận được là: <strong>{code}</strong>
            </p>
          )}
        />
      </Card>
    </Main>
  );
};

export default Home;
