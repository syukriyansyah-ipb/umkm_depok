"use client";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Image from "next/image";

interface IComment {
  id: number;
  username: string;
  comment: string;
  rating: number;
  profileImg: string; 
}

const comments: IComment[] = [
  {
    id: 1,
    username: "Ken Kaneki",
    comment: "Great product quality!",
    rating: 5,
    profileImg: "https://i.pinimg.com/736x/79/7c/15/797c15744d884e8f1be488c3e38e19f4.jpg",
  },
  {
    id: 2,
    username: "Jung Yunho",
    comment: "Fast delivery, loved it!",
    rating: 4,
    profileImg: "https://i.pinimg.com/564x/0e/69/8a/0e698a4c3ae635074468591c07bf4747.jpg",
  },
  {
    id: 3,
    username: "Ayam Sayur",
    comment: "Affordable and worth it!",
    rating: 5,
    profileImg: "https://i.pinimg.com/736x/d6/e4/1e/d6e41e1f5216569c1df10a4002f85419.jpg",
  },
  {
    id: 4,
    username: "Domba Garut",
    comment: "Decent product for the price.",
    rating: 3,
    profileImg: "https://i.pinimg.com/474x/96/89/c3/9689c387056d799f1d2138434898d9fe.jpg",
  },
];

const UserComments = () => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) =>
          index < rating ? (
            <AiFillStar key={index} className="text-yellow-400" />
          ) : (
            <AiOutlineStar key={index} className="text-gray-300" />
          )
        )}
      </div>
    );
  };

  return (
    <div className="mt-20 px-4 md:px-8 lg:px-16">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">
        What Our Customers Say
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-6 bg-white shadow-md rounded-lg border border-gray-200"
          >
            <div className="flex items-center mb-4">
              
              <Image
                width={70}
                height={50}
                src={comment.profileImg}
                alt={`${comment.username}'s profile`}
                className="w-12 h-12 rounded-full border border-gray-300 mr-4"
              />
              <div>
                <span className="text-lg font-semibold text-gray-800">
                  {comment.username}
                </span>
                <div>{renderStars(comment.rating)}</div>
              </div>
            </div>
            <p className="text-gray-600">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserComments;
