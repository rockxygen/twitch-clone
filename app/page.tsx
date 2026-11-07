import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex gap-2">
      <p>Only authanticated users cans see this page.</p>
      <UserButton />
    </div>
  );
}
