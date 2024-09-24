const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="relative flex flex-col justify-center items-center max-w-[480px] mx-auto min-h-screen border bg-white overflow-hidden">
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
