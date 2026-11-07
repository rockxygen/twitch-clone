"use client";

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Maintenance Mode
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md text-center">
        We are currently performing scheduled maintenance or experiencing a temporary issue.
        <br />
        Please try again later. Thank you for your patience.
      </p>
    </div>
  );
}

