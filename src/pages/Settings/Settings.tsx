import AccountInfo from './components/AccountInfo';
import PasswordSecurity from './components/PasswordSecurity';

const Settings = () => {
  return (
    <section>
      <h1 className="mb-5 font-heading text-3xl">Account Settings</h1>

      <div className="rounded-md bg-gray-100 dark:bg-gray-500">
        <details className="border-b-2 p-2" open>
          <summary className="mb-3 cursor-pointer font-heading text-lg font-bold">Account Information</summary>
          <div className="ml-8">
            <AccountInfo />
          </div>
        </details>

        <details className="border-b-2 p-2">
          <summary className="mb-3 cursor-pointer font-heading text-lg font-bold">Password & Security</summary>
          <div className="ml-8">
            <PasswordSecurity />
          </div>
        </details>
      </div>
    </section>
  );
};

export default Settings;
