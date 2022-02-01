import { useAccount, useConnect, useBalance } from 'wagmi';

const Balance = ({ address }) => {
  const [{ data, error, loading }, getBalance] = useBalance({
    addressOrName: address
  });

  if (loading) return <div>Fetching balance…</div>;
  if (error) return <div>Error fetching balance</div>;
  return (
    <div>
      {data?.formatted} {data?.symbol}
    </div>
  );
};

export default function Wallet() {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true
  });

  if (accountData) {
    return (
      <div>
        {/* <img src={accountData.ens?.avatar} alt="ENS Avatar" /> */}
        <div>
          {accountData.ens?.name
            ? `${accountData.ens?.name} (${accountData.address})`
            : accountData.address}
        </div>
        <div>Connected to {accountData.connector.name}</div>
        <Balance address={accountData.address} />
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {data.connectors.map(x => (
        <button
          // disabled={!x.ready}
          key={x.id}
          onClick={() => connect(x)}
        >
          {x.name}
          {!x.ready && ' (unsupported)'}
        </button>
      ))}

      {error && <div>{error?.message ?? 'Failed to connect'}</div>}
    </div>
  );
}
