import { IReview, Review } from '../../models/Review';
import { IUser } from '../../models/User';
import { CreateReviewInput } from '../../validation/review/create_review';

type ICreateReviewService = {
  user: Partial<IUser>;
  reviewInput: CreateReviewInput;
};

const createReviewService = async (review: ICreateReviewService): Promise<IReview | undefined> => {
  const {
    user: { _id, name, email, phone, photo },
    reviewInput: { comment },
  } = review;
  try {
    const new_review = await Review.create({ user: _id, name, email, photo, phone, comment });
    await new_review.save();
    return new_review;
  } catch (error) {
    console.error('Error creating review:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { createReviewService };
