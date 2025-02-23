import { IReview, Review } from '../../models/Review';

const findReviewByProperty = async (property: string, value: string): Promise<IReview | undefined> => {
  try {
    const review = await Review.findOne({
      [property]: value,
    });
    return review || undefined;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Error finding review by property:', error);
  }
};

export { findReviewByProperty };
