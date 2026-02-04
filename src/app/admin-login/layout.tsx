export const metadata = {
  title: "Admin | Pick Perfect",
  description: "Admin panel",
  robots: { index: false, follow: false },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
