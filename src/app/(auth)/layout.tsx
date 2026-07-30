export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center ">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#f86048]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px]" />
      </div>

      {children}
    </div>
  );
}
