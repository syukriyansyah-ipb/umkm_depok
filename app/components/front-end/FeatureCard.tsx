interface propsType {
    icon: React.ReactNode;
    title: string;
    desc: string;
  }
  
  const FeatureCard = ({ icon, title, desc }: propsType) => {
    return (
      <div className="flex gap-4 bg-pink-50 px-6 py-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="text-pink-600 text-3xl">{icon}</div>
  
        <div>
          <h2 className="font-semibold text-lg text-pink-700">{title}</h2>
          <p className="text-gray-700 mt-2 text-sm">{desc}</p>
        </div>
      </div>
    );
  };
  
  export default FeatureCard;
  