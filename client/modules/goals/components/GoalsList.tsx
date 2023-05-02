/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 18.10.2022
 * Time: 23:21
 */

import React from "react";
import { useSelector } from "react-redux";
import { IoList } from "react-icons/io5";
import { Skeleton } from "@chakra-ui/react";
import { selectGoals } from "../redux/goalsSlice";
import GoalItem from "./GoalItem";
import type { IGoalData } from "../redux/GoalsInterfaces";

const CategoriesList = () => {
  const goals = useSelector(selectGoals);

  return (
    <div className={"rounded-md border-[1px] border-d-lighter bg-d p-5"}>
      <div className={"flex items-center gap-2 text-lg font-bold"}>
        <IoList /> Twoje cele ({Array.isArray(goals) && goals.length})
      </div>
      <div className={"mt-3 text-sm text-w-darker"}>
        <p>Lista wszystkich twoich celów.</p>
        <p>
          ✨ W tym miejscu możesz zobaczyć swoje postępy w trwających celach.
        </p>
        <p>
          Jeśli uznasz, że cel został zrealizowany - zmień jego status i dodaj
          go do swoich statystyk.
        </p>
      </div>

      {/* <--- Display categories ---> */}
      <div className={"mt-3 grid gap-2"}>
        {goals &&
          goals.map((goal: IGoalData) => (
            <GoalItem data={goal} key={goal.id} />
          ))}

        {!goals && (
          <div className={"grid gap-2"}>
            <Skeleton startColor="black" endColor="gray" height={"44px"} />
            <Skeleton startColor="black" endColor="gray" height={"44px"} />
            <Skeleton startColor="black" endColor="gray" height={"44px"} />
            <Skeleton startColor="black" endColor="gray" height={"44px"} />
            <Skeleton startColor="black" endColor="gray" height={"44px"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
