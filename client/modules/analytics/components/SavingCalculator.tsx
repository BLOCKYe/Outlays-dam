import React from "react";
import { HiCalculator } from "react-icons/hi";

const SavingCalculator: React.FC = (props) => {
  return (
    <div className={"rounded-md border-[1px] border-d-lighter bg-d p-5"}>
      <div className={"flex items-center justify-between gap-3"}>
        {/* <--- Display history list text ---> */}
        <>
          <div className={"flex items-center gap-2 text-lg font-bold"}>
            <HiCalculator />
            Kalkulator
          </div>
        </>
      </div>

      <div className={"mt-3 text-sm text-w-darker"}>
        <p> Kalkulator pozwalający oszacować oszczędności.</p>
        <p>✨ W tym miejscu możesz zasymulować swój trend oszczędnościowy.</p>
      </div>
    </div>
  );
};

export default SavingCalculator;
