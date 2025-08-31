interface User {
    id: string;
    name: string;
    email: string;
}
export function UserIcon({ user }: { user: User }) {
  return (
    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
      <span className="text-sm font-medium text-purple-600">
        {user.name[0]!.toUpperCase()}
      </span>
    </div>
  );
}