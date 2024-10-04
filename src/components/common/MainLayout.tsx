const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 flex justify-center bg-white">
      <div className="w-full max-w-[480px] h-full overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
