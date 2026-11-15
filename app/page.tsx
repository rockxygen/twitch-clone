import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex gap-2 items-center justify-center min-h-full w-full dark:bg-zinc-700/10 bg-white">
      <p className="dark:text-white text-dark">Only authanticated users cans see this page.</p>
      <UserButton />
      <ModeToggle />
    </div>
  );
}
