const HeroImage = () => {
  return (
    <div className="relative">
      <div className="absolute left-10 top-10 h-[420px] w-[420px] rounded-full bg-blue-100 blur-[110px]" />

      <div className="relative flex h-[520px] w-[500px] items-center justify-center rounded-[40px] border border-slate-200 bg-white shadow-2xl">
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center">
            <div className="text-8xl">🏡</div>

            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              Your Future Home
            </h2>

            <p className="mt-4 px-10 text-slate-500">
              Beautiful property illustration will be added here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
