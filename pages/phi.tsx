import { useState } from 'react';
import Main from '@templates/Main';
import { Card, Form, InputNumber, Button } from 'antd';
import { Prime } from '@utils/index';
import { PRIME_NUMBER } from '@constants/primeNumber';

const Home = () => {
  const [result, setResult] = useState<string | null>(null);
  const breadCrumb = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Φ (Phi)', href: '/phi' },
  ];
  const onFinish = (values: any) => {
    const phi = values.phi;
    let result = ``;
    const isPrime = Prime(phi);
    if (phi === 1) result += `<p>Φ(${phi}) = 1</p>`;
    else if (isPrime) result += `<p>Φ(${phi}) = ${phi} - 1 = ${phi - 1}</p>`;
    else {
      for (const i of PRIME_NUMBER) {
        for (let j = 2; j <= 20; j++) {
          if (Math.pow(i, j) === phi) {
            result += `<p>Φ(${phi}) = Φ(${i}<sup>${j}</sup>) = ${phi}(1 - 1/${i}) = ${parseInt(
              `${phi * (1 - 1 / i)}`
            )}</p>`;

            return setResult(result);
          }
        }
      }
      for (let i = 2; i <= Math.sqrt(phi); i++) {
        if (Number.isInteger(phi / i)) {
          const A = i;
          const B = phi / i;

          if (Prime(A) && Prime(B)) {
            result += `<p>Φ(${phi}) = Φ(${A}) . Φ(${B}) = ${A - 1} . ${
              B - 1
            } = ${parseInt(`${(A - 1) * (B - 1)}`)}</p>`;

            return setResult(result);
          } else if (Prime(A) && !Prime(B)) {
            for (const i of PRIME_NUMBER) {
              for (let j = 2; j <= 20; j++) {
                if (Math.pow(i, j) === B) {
                  result += `<p>Φ(${phi}) = Φ(${A}) . Φ(${B}) = ${
                    A - 1
                  } . Φ(${i}<sup>${j}</sup>) = ${
                    A - 1
                  } . ${B}(1 - 1/${i}) = ${parseInt(
                    `${(A - 1) * (B * (1 - 1 / i))}`
                  )}</p>`;

                  return setResult(result);
                } else {
                  for (let i = 2; i <= Math.sqrt(B); i++) {
                    if (Number.isInteger(B / i)) {
                      const C = i;
                      const D = B / i;
                      result += `<p>Φ(${phi}) = Φ(${A}) . Φ(${B}) = ${
                        A - 1
                      } . ${C} . ${D} = ${A - 1} . ${C - 1} . ${
                        D - 1
                      } = ${parseInt(`${(A - 1) * (C - 1) * (D - 1)}`)}</p>`;
                      return setResult(result);
                    }
                  }
                }
              }
            }
          } else {
            let factorA = null;
            let factorB = null;
            for (const i of PRIME_NUMBER) {
              if (factorA !== null) break;
              for (let j = 2; j <= 20; j++) {
                if (Math.pow(i, j) === A) {
                  factorA = {
                    i,
                    j,
                  };
                  break;
                }
              }
            }
            for (const i of PRIME_NUMBER) {
              if (factorB !== null) break;
              for (let j = 2; j <= 20; j++) {
                if (Math.pow(i, j) === B) {
                  factorB = {
                    i,
                    j,
                  };
                  break;
                }
              }
            }
            if (factorA !== null && factorB !== null) {
              result += `<p>Φ(${phi}) = Φ(${A}) . Φ(${B}) = Φ(${
                factorA.i
              }<sup>${factorA.j}</sup>) . Φ(${factorB.i}<sup>${
                factorB.j
              }</sup>) = ${A}(1 - 1/${factorA.i}) . ${B}(1 - 1/${
                factorB.i
              }) = ${parseInt(
                `${A * (1 - 1 / factorA.i) * (B * (1 - 1 / factorB.i))}`
              )}</p>`;

              return setResult(result);
            }
          }
        }
      }
    }
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
