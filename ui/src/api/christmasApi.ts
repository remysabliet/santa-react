import { IChristmasWish } from "../@types/christmas";

export const createWish = async (wishes: IChristmasWish) => {
  const response = await fetch("/api/christmas/wishes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wishes),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error occurred: ${data.message}`);
  }

  return data;
};
