const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 flex justify-center bg-white overflow-hidden">
      <div className="w-full max-w-[480px] h-full overflow-y-auto overflow-x-hidden">
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
