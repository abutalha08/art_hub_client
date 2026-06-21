const DashboardHeading = ({ title, description }) => {
  return (
    <div className="pb-5 border-b border-[#27273A]/40 space-y-1">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
        {title}
      </h1>

      <p className="text-xs sm:text-sm text-[#8E8E9F] leading-relaxed max-w-2xl">
        {description}
      </p>
    </div>
  );
};

export default DashboardHeading;