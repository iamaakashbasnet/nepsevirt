import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-screen items-center px-4 py-8 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 font-heading text-7xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500 lg:text-9xl">
          404
        </h1>
        <p className="mb-4 font-heading text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Something's missing.
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page.</p>
        <button
          onClick={() => navigate(-1)}
          className="my-4 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default Error404;
