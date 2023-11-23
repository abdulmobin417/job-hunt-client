import { useEffect } from "react";
const useTitle = (title) => {
  useEffect(() => {
    document.title = `MyJobGator | ${title}`;
  });
};

export default useTitle;
