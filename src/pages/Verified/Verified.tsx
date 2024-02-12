import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const Verified = () => {
  const navigate = useNavigate();
  const { hash, token } = useParams();

  const { isLoading, isError, isSuccess } = useQuery({
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      await axios.get(`/api/accounts/activate/${hash}/${token}/`);
    },
    queryKey: ['verify-email'],
    retry: 1,
  });

  return (
    <div className="mx-auto flex min-h-screen items-center px-4 py-8 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-screen-sm text-center">
        {isLoading && <p>Loading...</p>}

        {isError && (
          <>
            <p className="mb-4 font-heading text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              Invalid link
            </p>
          </>
        )}

        {isSuccess && (
          <>
            <p className="mb-4 font-heading text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              Email verified
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Now you can use our services as usual.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="my-4 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Go to dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Verified;
