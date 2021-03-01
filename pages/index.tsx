import { useState } from 'react';
import Main from '@templates/Main';
import { Card, Form, Input, InputNumber, Button, Table, Radio } from 'antd';
import { MODULO26, MODULO26_ARRAY } from '@constants/index';

const Home = () => {
  const [columns, setColumns] = useState(undefined);
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [code, setcode] = useState<string | null>(null);
  const [type, setType] = useState<number>(0);
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

    if (type === 0) {
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
    }

    if (type === 1) {
      const subK = textToArray.reduce(
        (obj: any, current: string) => {
          obj[current] =
            MODULO26[current.toUpperCase()] - values.key < 0
              ? MODULO26[current.toUpperCase()] - values.key + 26
              : MODULO26[current.toUpperCase()] - values.key;
          return obj;
        },
        { key: 2 }
      );

      let code = '';
      const encode = textToArray.reduce(
        (obj: any, current: string) => {
          const index =
            MODULO26[current.toUpperCase()] - values.key < 0
              ? MODULO26[current.toUpperCase()] - values.key + 26
              : MODULO26[current.toUpperCase()] - values.key;

          obj[current] = MODULO26_ARRAY[index];
          code += MODULO26_ARRAY[index];
          return obj;
        },
        { key: 3 }
      );
      setColumns(col);
      setData([dt, subK, encode]);
      setcode(code);
    }
  };

  const handleChangeType = (e: any) => setType(e.target.value);
  return (
    <Main breadCrumb={breadCrumb}>
      <Card title="Mã dịch vòng (Shift Cipher)">
        <Form
          name="shift-cipher"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ key: 0 }}
        >
          <Form.Item>
            <Radio.Group value={type} onChange={handleChangeType}>
              <Radio value={0}>Mã hóa</Radio>
              <Radio value={1}>Giải mã</Radio>
            </Radio.Group>
          </Form.Item>
          {type === 0 ? (
            <Form.Item
              label="Bản rõ"
              name="text"
              rules={[
                { required: true, message: 'Vui lòng nhập bản rõ!' },
                {
                  pattern: new RegExp('[A-Za-z]'),
                  message: 'Vui lòng nhập các ký tự từ A-Z',
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              label="Bản mã"
              name="text"
              rules={[{ required: true, message: 'Vui lòng nhập bản mã!' }]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            label="Khóa k"
            name="key"
            rules={[{ required: true, message: 'Vui lòng nhập khóa k!' }]}
          >
            <InputNumber min={0} max={25} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {type === 0 ? `Mã hóa` : 'Giải mã'}
            </Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
          footer={() =>
            code && (
              <p>
                Vậy bản mã nhận được là: <strong>{code}</strong>
              </p>
            )
          }
        />
      </Card>
    </Main>
  );
};

export default Home;
