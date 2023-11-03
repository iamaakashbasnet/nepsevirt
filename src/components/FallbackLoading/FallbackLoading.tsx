import logo from 'assets/logo.png';

const FallbackLoading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-10">
      <img className="block w-48 animate-pulse" src={logo} alt="NEPSE Virt logo" />
      <h1 className="font-heading text-3xl">NEPSE Virt</h1>
    </div>
  );
};

export default FallbackLoading;
