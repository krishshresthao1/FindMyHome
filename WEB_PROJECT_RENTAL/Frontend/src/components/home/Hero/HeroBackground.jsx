const HeroBackground = () => {
  return (
    <>
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-100 blur-[120px]" />

      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-sky-100 blur-[150px]" />

      <div className="absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-indigo-100 blur-[130px]" />
    </>
  );
};

export default HeroBackground;
