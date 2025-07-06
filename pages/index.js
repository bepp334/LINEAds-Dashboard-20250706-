import Head from 'next/head';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <>
      <Head>
        <title>LINE Ads ダッシュボード</title>
        <meta name="description" content="LINE Ads APIを使用したリアルタイム広告データダッシュボード" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
} 