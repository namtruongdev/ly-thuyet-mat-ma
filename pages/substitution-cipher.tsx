import Main from '@templates/Main';
import { Card } from 'antd';

const SubstitutionCipher = () => {
  const breadCrumb = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Mã thay thế (Substitution Cipher)', href: '/substitution-cipher' },
  ];

  return (
    <Main breadCrumb={breadCrumb} defaultSelectedKeys={['2']}>
      <Card title="Mã thay thế (Substitution Cipher)">Chưa có</Card>
    </Main>
  );
};

export default SubstitutionCipher;
