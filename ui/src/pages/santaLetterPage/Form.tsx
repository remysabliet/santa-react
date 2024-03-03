import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { createWish } from "../../api/christmasApi";
import { IChristmasWish } from "../../@types/christmas";

const ChristmasWishesForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChristmasWish>();

  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  const onSubmit = async (data: IChristmasWish) => {
    try {
      let res = await createWish(data);
      setApiSuccess(res.message);
      setApiError(null);
    } catch (error: any) {
      setApiSuccess(null);
      setApiError(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <p className="font-bold max-w-xl my-4">Ho ho ho, what you want for Christmas?</p>
      <label htmlFor="username">Who are you?</label>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", { required: true })}
          placeholder="charlie.brown"
          className="block mb-2 p-1 w-72 border border-gray-300 rounded text-base"
        />
        {errors.username && <p className="err-msg w-72 mb-2">{errors.username.message}</p>}
        <label htmlFor="message">What do you want for Christmas?</label>
        <textarea
          {...register("message", {
            required: "This field is required.",
            minLength: { value: 10, message: "This field should be at least 10 characters." },
            maxLength: { value: 500, message: "This field should not exceed 500 characters." },
          })}
          className="block mb-2 p-1 w-72 border border-gray-300 rounded text-base"
          rows={10}
          cols={45}
          placeholder="Gifts!"
        ></textarea>
        {errors.message && (
          <p className="err-msg w-72 mb-2">{errors.message.message}</p>
        )}
        <br />
        <button
          type="submit"
          id="submit-letter"
          className="px-1.5 py-0.4 text-base bg-gray-300 border border-gray-500 shadow-button cursor-pointer hover:bg-yellow-500 active:shadow-none "
        >
          Send
        </button>
        {apiError && <p className="err-msg w-72 my-5">{apiError}</p>}
        {apiSuccess && <p className="success-msg w-72 my-5">{apiSuccess}</p>}
      </form>
    </div>
  );
};

export default ChristmasWishesForm;
