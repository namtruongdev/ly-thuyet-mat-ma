import Main from '@templates/Main';

const Home = () => {
  const breadCrumb = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Mã dịch vòng (Shift Cipher)', href: '/' },
  ];
  return (
    <Main breadCrumb={breadCrumb}>
      <h1>hihi</h1>
    </Main>
  );
};

export default Home;
