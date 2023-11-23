/* eslint-disable react/prop-types */
const SubTitle = ({ title }) => {
  return (
    <div>
      <div className="max-w-[324px] h-[3px] bg-[#989090] mx-auto my-4" />
      <h1 className="uppercase text-2xl black text-center">{title}</h1>
      <div className="max-w-[324px] h-[3px] bg-[#989090] mx-auto my-4" />
    </div>
  );
};

export default SubTitle;
