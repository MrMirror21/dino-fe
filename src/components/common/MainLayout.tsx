const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <div
        style={{
          background:
            'linear-gradient(168deg, rgba(251, 243, 231, 0.20) 0%, rgba(185, 206, 215, 0.20) 47.11%, rgba(235, 219, 244, 0.20) 100%), #FFF',
          boxShadow: '0px 2px 32px 0px rgba(136, 136, 136, 0.12)',
        }}
        className="relative flex flex-col justify-center items-center max-w-[480px] mx-auto min-h-screen border bg-white overflow-hidden "
      >
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
