import SubTitle from "../../components/SubTitle/SubTitle";
import PackageItem from "./PackageItem";

const Package = () => {
  const packagePrice = [
    {
      id: 1,
      name: "Basic",
      price: 50,
      quiz: "3",
      update: "3 month",
      support: "1 month",
      question: "12",
    },
    {
      id: 2,
      name: "Standard",
      price: 70,
      quiz: "6",
      update: "6 month",
      support: "6 month",
      question: "20",
    },
    {
      id: 3,
      name: "Premium",
      price: 100,
      quiz: "10",
      update: "1 year",
      support: "Life time",
      question: "30",
    },
  ];
  return (
    <div className="mt-10">
      <div className="my-16">
        <SubTitle title={"quiz package"}></SubTitle>
      </div>
      <div className="flex justify-center gap-16 flex-wrap">
        {packagePrice?.map((item) => (
          <PackageItem key={item.id} packagePrice={item} />
        ))}
      </div>
    </div>
  );
};

export default Package;
